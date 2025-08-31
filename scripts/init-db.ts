import { db } from '../src/lib/db'
import { plans } from '../src/lib/db/schema'
import { sql } from 'drizzle-orm'

async function initDatabase() {
  try {
    console.log('Initializing database...')
    
    // Create tables
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS plans (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE,
        display_name VARCHAR(100) NOT NULL,
        description TEXT,
        price_monthly DECIMAL(10, 2) DEFAULT 0,
        price_yearly DECIMAL(10, 2) DEFAULT 0,
        features JSONB DEFAULT '[]'::jsonb,
        limits JSONB DEFAULT '{}'::jsonb,
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255),
        username VARCHAR(100) UNIQUE,
        password_hash VARCHAR(255),
        profile_picture_url TEXT,
        bio TEXT,
        location VARCHAR(255),
        website VARCHAR(255),
        social_links JSONB DEFAULT '{}'::jsonb,
        auth_provider VARCHAR(50) DEFAULT 'email',
        provider_id VARCHAR(255),
        provider_data JSONB DEFAULT '{}'::jsonb,
        email_verified BOOLEAN DEFAULT false,
        plan_id UUID REFERENCES plans(id),
        subscription_status VARCHAR(50) DEFAULT 'active',
        subscription_started_at TIMESTAMPTZ,
        subscription_ends_at TIMESTAMPTZ,
        usage_stats JSONB DEFAULT '{}'::jsonb,
        preferences JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ
      )
    `)

    // Check if plans exist
    const existingPlans = await db.select().from(plans)
    
    if (existingPlans.length === 0) {
      console.log('Creating default plans...')
      
      // Insert default plans
      await db.insert(plans).values([
        {
          name: 'early_risers',
          displayName: 'Early Risers',
          description: 'Exclusive early access plan',
          priceMonthly: '0',
          priceYearly: '0',
          features: ['Unlimited file storage', 'P2P file sharing', 'Real-time collaboration', 'Priority support'],
          limits: { storage: 'unlimited', bandwidth: 'unlimited' },
          sortOrder: 1,
        },
        {
          name: 'free',
          displayName: 'Free',
          description: 'Basic plan for personal use',
          priceMonthly: '0',
          priceYearly: '0',
          features: ['5GB storage', 'Basic file sharing'],
          limits: { storage: '5GB', bandwidth: '10GB' },
          sortOrder: 2,
        },
        {
          name: 'pro',
          displayName: 'Pro',
          description: 'Professional plan for power users',
          priceMonthly: '9.99',
          priceYearly: '99.99',
          features: ['100GB storage', 'Advanced sharing', 'Team collaboration'],
          limits: { storage: '100GB', bandwidth: 'unlimited' },
          sortOrder: 3,
        }
      ])
      
      console.log('Default plans created successfully')
    }
    
    console.log('Database initialized successfully')
    process.exit(0)
  } catch (error) {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  }
}

initDatabase()