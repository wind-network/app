import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { compare } from 'bcryptjs'
import { db } from '@/lib/db'
import { users, plans } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1)
        
        if (!user.length || !user[0].passwordHash) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user[0].passwordHash)
        
        if (!isPasswordValid) {
          return null
        }

        // Update last login
        await db.update(users)
          .set({ lastLoginAt: new Date() })
          .where(eq(users.id, user[0].id))

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          image: user[0].profilePictureUrl,
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          // Check if user exists
          const existingUser = await db.select().from(users).where(eq(users.email, user.email!)).limit(1)
          
          if (existingUser.length === 0) {
            // Get the Early Risers plan
            const earlyRisersPlan = await db.select().from(plans).where(eq(plans.name, 'early_risers')).limit(1)
            
            // Create new user with social login
            await db.insert(users).values({
              email: user.email!,
              name: user.name || profile?.name || '',
              profilePictureUrl: user.image || (profile as any)?.image || (profile as any)?.avatar_url || '',
              authProvider: account.provider,
              providerId: account.providerAccountId,
              providerData: profile as any,
              emailVerified: true,
              planId: earlyRisersPlan[0]?.id,
              subscriptionStatus: 'active',
              subscriptionStartedAt: new Date(),
              lastLoginAt: new Date(),
            })
          } else {
            // Update existing user
            await db.update(users)
              .set({
                name: user.name || existingUser[0].name,
                profilePictureUrl: user.image || existingUser[0].profilePictureUrl,
                lastLoginAt: new Date(),
              })
              .where(eq(users.id, existingUser[0].id))
          }
        } catch (error) {
          console.error('Error during social sign in:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        
        // Fetch full user data including plan
        const userData = await db.select({
          user: users,
          plan: plans,
        })
        .from(users)
        .leftJoin(plans, eq(users.planId, plans.id))
        .where(eq(users.id, token.sub))
        .limit(1)
        
        if (userData.length > 0) {
          const { user, plan } = userData[0]
          session.user = {
            ...session.user,
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.profilePictureUrl,
            username: user.username,
            bio: user.bio,
            location: user.location,
            website: user.website,
            socialLinks: user.socialLinks as any,
            plan: plan ? {
              id: plan.id,
              name: plan.name,
              displayName: plan.displayName,
              features: plan.features as string[],
              limits: plan.limits as any,
            } : null,
            subscriptionStatus: user.subscriptionStatus,
            preferences: user.preferences as any,
          }
        }
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
}