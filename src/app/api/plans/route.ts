import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plans } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const allPlans = await db.select().from(plans)
      .where(eq(plans.isActive, true))
      .orderBy(plans.sortOrder)
    
    return NextResponse.json(allPlans)
  } catch (error) {
    console.error('Plans fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    )
  }
}