import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      username?: string | null
      bio?: string | null
      location?: string | null
      website?: string | null
      socialLinks?: {
        github?: string
        twitter?: string
        linkedin?: string
      }
      plan?: {
        id: string
        name: string
        displayName: string
        features: string[]
        limits: any
      } | null
      subscriptionStatus?: string | null
      preferences?: any
      authProvider?: string
      createdAt?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    username?: string | null
    bio?: string | null
    location?: string | null
    website?: string | null
    socialLinks?: any
    plan?: any
    subscriptionStatus?: string | null
    preferences?: any
    authProvider?: string
    createdAt?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username?: string | null
    bio?: string | null
    location?: string | null
    website?: string | null
    socialLinks?: any
    plan?: any
    subscriptionStatus?: string | null
    preferences?: any
    authProvider?: string
    createdAt?: string
  }
}