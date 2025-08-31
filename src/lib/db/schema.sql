-- Database schema for Wind Space application
-- Using Neon PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10, 2) DEFAULT 0,
  price_yearly DECIMAL(10, 2) DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  limits JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
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
  subscription_started_at TIMESTAMP WITH TIME ZONE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  usage_stats JSONB DEFAULT '{}'::jsonb,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  refresh_token VARCHAR(500) UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profile pictures table (for managing uploads)
CREATE TABLE IF NOT EXISTS user_profile_pictures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size INTEGER,
  mime_type VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription history table
CREATE TABLE IF NOT EXISTS subscription_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES plans(id),
  action VARCHAR(50) NOT NULL, -- 'subscribed', 'upgraded', 'downgraded', 'cancelled', 'expired'
  previous_plan_id UUID REFERENCES plans(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_plan_id ON users(plan_id);
CREATE INDEX idx_users_provider ON users(auth_provider, provider_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(token);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_subscription_history_user_id ON subscription_history(user_id);

-- Insert default plans
INSERT INTO plans (name, display_name, description, price_monthly, price_yearly, features, limits, sort_order)
VALUES 
  ('early_risers', 'Early Risers', 'Free plan for early adopters', 0, 0, 
   '["Unlimited searches", "Basic indexing (100 URLs/day)", "Community support", "Access to public network", "Basic analytics"]'::jsonb,
   '{"storage": "10GB", "api_calls": 10000, "indexing_jobs": 100}'::jsonb, 1),
  
  ('starter', 'Starter', 'Perfect for individuals and small projects', 9.99, 99, 
   '["Everything in Early Risers", "Advanced indexing (1000 URLs/day)", "Priority support", "Custom search filters", "Advanced analytics", "API access"]'::jsonb,
   '{"storage": "100GB", "api_calls": 100000, "indexing_jobs": 1000}'::jsonb, 2),
  
  ('professional', 'Professional', 'For teams and growing businesses', 29.99, 299, 
   '["Everything in Starter", "Unlimited indexing", "Dedicated support", "Team collaboration", "Custom integrations", "Advanced API features", "Priority processing"]'::jsonb,
   '{"storage": "1TB", "api_calls": 1000000, "indexing_jobs": -1}'::jsonb, 3),
  
  ('enterprise', 'Enterprise', 'Custom solutions for large organizations', null, null, 
   '["Everything in Professional", "Unlimited everything", "24/7 dedicated support", "Custom deployment options", "SLA guarantee", "Advanced security features", "Custom development"]'::jsonb,
   '{"storage": -1, "api_calls": -1, "indexing_jobs": -1}'::jsonb, 4)
ON CONFLICT (name) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();