import type { SiteConfig, SEOData } from '@/types'

// Site configuration
export const SITE_CONFIG: SiteConfig = {
  name: 'Wind Space',
  description: 'The world\'s most efficient decentralized storage service. 92% cheaper than AWS S3, 5x faster performance.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://windspace.io',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/windspace',
    github: 'https://github.com/windspace',
    discord: 'https://discord.gg/windspace',
    linkedin: 'https://linkedin.com/company/windspace'
  }
}

// SEO metadata
export const DEFAULT_SEO: SEOData = {
  title: 'Wind Space - World\'s Most Efficient Storage Service',
  description: 'The fastest, most scalable decentralized storage solution built for real-world applications. 92% cheaper than AWS S3, 5x faster performance.',
  keywords: [
    'decentralized storage',
    'blockchain storage',
    'Solana storage',
    'AWS alternative',
    'fast storage',
    'scalable storage',
    'Filecoin',
    'Avalanche',
    'Web3 storage',
    'developer tools'
  ],
  type: 'website',
  siteName: 'Wind Space'
}

// Performance metrics
export const PERFORMANCE_STATS = {
  COST_REDUCTION: 92,
  PERFORMANCE_MULTIPLIER: 5,
  UPTIME_SLA: 99.99,
  QUERY_LATENCY: 300,
  DATA_PROCESSED_DAILY: 4,
  SETUP_TIME_MINUTES: 5
} as const

// Pricing constants
export const PRICING = {
  DEVELOPER: {
    STORAGE_GB: 1,
    API_CALLS: 100_000,
    PRICE_MONTHLY: 0,
    PRICE_YEARLY: 0
  },
  GROWTH: {
    STORAGE_GB: 50,
    API_CALLS: 1_000_000,
    PRICE_MONTHLY: 49,
    PRICE_YEARLY: 490,
    ADDITIONAL_GB_PRICE: 0.025
  },
  SCALE: {
    STORAGE_GB: 500,
    API_CALLS: 10_000_000,
    PRICE_MONTHLY: 299,
    PRICE_YEARLY: 2990,
    ADDITIONAL_GB_PRICE: 0.020
  }
} as const

// Technical specifications
export const TECH_SPECS = {
  QUERY_LATENCY_P95: '< 100ms',
  THROUGHPUT: '10GB/s',
  COMPRESSION_REDUCTION: '60-95%',
  CACHE_HIT_RATE: '95%+',
  CONCURRENT_CONNECTIONS: '100K+',
  DURABILITY: '11×9s (99.999999999%)',
  AVAILABILITY_SLA: '99.99%',
  GLOBAL_LOCATIONS: '50+',
  DISASTER_RECOVERY_RTO: '< 4 hours'
} as const

// Animation constants
export const ANIMATION = {
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 0.8
  },
  EASE: {
    DEFAULT: 'easeOut',
    SPRING: 'easeInOut',
    BOUNCE: 'easeOut'
  },
  DELAYS: {
    STAGGER: 0.1,
    SECTION: 0.2,
    ELEMENT: 0.05
  }
} as const

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

// Color palette
export const COLORS = {
  BRAND: {
    PRIMARY: '#3b82f6', // blue-500
    SECONDARY: '#06b6d4', // cyan-500
    ACCENT: '#8b5cf6' // violet-500
  },
  STATUS: {
    SUCCESS: '#22c55e', // green-500
    WARNING: '#f59e0b', // amber-500
    ERROR: '#ef4444', // red-500
    INFO: '#3b82f6' // blue-500
  },
  NEUTRAL: {
    WHITE: '#ffffff',
    BLACK: '#000000',
    SLATE_950: '#0a0e1a',
    SLATE_900: '#0f172a',
    SLATE_800: '#1e293b',
    SLATE_700: '#334155',
    SLATE_600: '#475569',
    SLATE_500: '#64748b',
    SLATE_400: '#94a3b8',
    SLATE_300: '#cbd5e1',
    SLATE_200: '#e2e8f0',
    SLATE_100: '#f1f5f9'
  }
} as const

// API endpoints (for future use)
export const API_ENDPOINTS = {
  NEWSLETTER: '/api/newsletter',
  CONTACT: '/api/contact',
  HEALTH: '/api/health',
  METRICS: '/api/metrics'
} as const

// Feature flags
export const FEATURES = {
  ANALYTICS: process.env.NODE_ENV === 'production',
  DEBUG: process.env.NODE_ENV === 'development',
  BETA_FEATURES: process.env.NEXT_PUBLIC_BETA === 'true',
  MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE === 'true'
} as const

// Social media
export const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    href: SITE_CONFIG.links.twitter,
    username: '@windspace'
  },
  {
    name: 'GitHub',
    href: SITE_CONFIG.links.github,
    username: 'windspace'
  },
  {
    name: 'Discord',
    href: SITE_CONFIG.links.discord,
    username: 'windspace'
  },
  {
    name: 'LinkedIn',
    href: SITE_CONFIG.links.linkedin,
    username: 'windspace'
  }
] as const

// Navigation links
export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#specs', label: 'Tech Specs' },
  { href: '#docs', label: 'Documentation' }
] as const

// Trust indicators
export const TRUSTED_BY = [
  'Solana Labs',
  'Metaplex',
  'Jupiter',
  'Magic Eden',
  'Phantom'
] as const

// File size limits
export const FILE_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_FILES: 10
} as const

// Cache settings
export const CACHE = {
  STATIC_ASSETS: 31536000, // 1 year
  API_RESPONSES: 300, // 5 minutes
  CDN_CACHE: 86400 // 1 day
} as const

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  SERVER: 'Server error. Please try again later.'
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!',
  CONTACT_SENT: 'Message sent successfully!',
  FORM_SUBMITTED: 'Form submitted successfully!'
} as const