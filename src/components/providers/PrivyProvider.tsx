'use client'

import { ReactNode } from 'react'

// Privy is temporarily disabled to avoid origin errors
// We're using NextAuth for authentication instead
export function PrivyProvider({ children }: { children: ReactNode }) {
  // Privy is disabled - just pass through children
  // To re-enable Privy:
  // 1. Set NEXT_PUBLIC_PRIVY_APP_ID in .env.local
  // 2. Add your origin to Privy dashboard: https://dashboard.privy.io/apps
  // 3. Uncomment the Privy implementation code
  
  return <>{children}</>
}