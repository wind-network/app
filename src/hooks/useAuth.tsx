'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth(requireAuth = false) {
  const { user, ready, authenticated, login, logout } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && ready && !authenticated) {
      router.push('/')
    }
  }, [requireAuth, ready, authenticated, router])

  const getUserDisplayName = () => {
    if (!user) return 'User'
    
    if (user.email) {
      return user.email.address.split('@')[0]
    }
    
    if (user.wallet) {
      return `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
    }
    
    if (user.google) {
      return user.google.name || user.google.email.split('@')[0]
    }
    
    if (user.github) {
      return user.github.username
    }
    
    return 'User'
  }

  const getUserEmail = () => {
    if (!user) return ''
    
    if (user.email) return user.email.address
    if (user.google) return user.google.email
    
    return ''
  }

  const getUserAvatar = () => {
    if (!user) return null
    
    if ((user as any).google?.profilePictureUrl) return (user as any).google.profilePictureUrl
    if ((user as any).github?.profilePictureUrl) return (user as any).github.profilePictureUrl
    
    return null
  }

  return {
    user,
    ready,
    authenticated,
    login,
    logout,
    getUserDisplayName,
    getUserEmail,
    getUserAvatar,
  }
}