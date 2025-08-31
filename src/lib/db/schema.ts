import { pgTable, uuid, varchar, text, boolean, timestamp, decimal, jsonb, integer, inet } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const plans = pgTable('plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),
  priceMonthly: decimal('price_monthly', { precision: 10, scale: 2 }).default('0'),
  priceYearly: decimal('price_yearly', { precision: 10, scale: 2 }).default('0'),
  features: jsonb('features').default([]),
  limits: jsonb('limits').default({}),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  username: varchar('username', { length: 100 }).unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  profilePictureUrl: text('profile_picture_url'),
  bio: text('bio'),
  location: varchar('location', { length: 255 }),
  website: varchar('website', { length: 255 }),
  socialLinks: jsonb('social_links').default({}),
  authProvider: varchar('auth_provider', { length: 50 }).default('email'),
  providerId: varchar('provider_id', { length: 255 }),
  providerData: jsonb('provider_data').default({}),
  emailVerified: boolean('email_verified').default(false),
  planId: uuid('plan_id').references(() => plans.id),
  subscriptionStatus: varchar('subscription_status', { length: 50 }).default('active'),
  subscriptionStartedAt: timestamp('subscription_started_at', { withTimezone: true }),
  subscriptionEndsAt: timestamp('subscription_ends_at', { withTimezone: true }),
  usageStats: jsonb('usage_stats').default({}),
  preferences: jsonb('preferences').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
})

export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  refreshToken: varchar('refresh_token', { length: 500 }).unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const userProfilePictures = pgTable('user_profile_pictures', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  isActive: boolean('is_active').default(true),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).defaultNow(),
})

export const subscriptionHistory = pgTable('subscription_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: uuid('plan_id').notNull().references(() => plans.id),
  action: varchar('action', { length: 50 }).notNull(),
  previousPlanId: uuid('previous_plan_id').references(() => plans.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  metadata: jsonb('metadata').default({}),
})

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  plan: one(plans, {
    fields: [users.planId],
    references: [plans.id],
  }),
  sessions: many(userSessions),
  profilePictures: many(userProfilePictures),
  subscriptionHistory: many(subscriptionHistory),
}))

export const plansRelations = relations(plans, ({ many }) => ({
  users: many(users),
  subscriptionHistory: many(subscriptionHistory),
}))

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}))

export const userProfilePicturesRelations = relations(userProfilePictures, ({ one }) => ({
  user: one(users, {
    fields: [userProfilePictures.userId],
    references: [users.id],
  }),
}))

export const subscriptionHistoryRelations = relations(subscriptionHistory, ({ one }) => ({
  user: one(users, {
    fields: [subscriptionHistory.userId],
    references: [users.id],
  }),
  plan: one(plans, {
    fields: [subscriptionHistory.planId],
    references: [plans.id],
  }),
  previousPlan: one(plans, {
    fields: [subscriptionHistory.previousPlanId],
    references: [plans.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Plan = typeof plans.$inferSelect
export type NewPlan = typeof plans.$inferInsert
export type UserSession = typeof userSessions.$inferSelect
export type NewUserSession = typeof userSessions.$inferInsert