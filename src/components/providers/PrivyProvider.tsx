'use client'

import { PrivyProvider as Provider } from '@privy-io/react-auth'
import { ReactNode } from 'react'

export function PrivyProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'clwm3u3sv00nvla0fqjbf6v70'}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6',
          logo: '/logo.png',
        },
        loginMethods: ['email', 'wallet', 'google', 'github'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
        walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      }}
    >
      {children}
    </Provider>
  )
}