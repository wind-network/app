import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { db } from '@/lib/db'
import { users, plans } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Get the Early Risers plan
    const earlyRisersPlan = await db.select().from(plans).where(eq(plans.name, 'early_risers')).limit(1)
    
    if (!earlyRisersPlan.length) {
      return NextResponse.json(
        { error: 'Default plan not found' },
        { status: 500 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user with Early Risers plan
    const newUser = await db.insert(users).values({
      email,
      name: name || email.split('@')[0],
      passwordHash: hashedPassword,
      authProvider: 'email',
      planId: earlyRisersPlan[0].id,
      subscriptionStatus: 'active',
      subscriptionStartedAt: new Date(),
      emailVerified: false,
    }).returning()

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
        plan: earlyRisersPlan[0].displayName,
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}