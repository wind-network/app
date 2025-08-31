'use client'

import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export function useAuth(requireAuth = false) {
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const isAuthenticated = status === 'authenticated'
  const isReady = status !== 'loading'

  useEffect(() => {
    if (requireAuth && isReady && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [requireAuth, isReady, isAuthenticated, router])

  const getUserDisplayName = () => {
    if (!session?.user) return 'User'
    
    if (session.user.name) {
      return session.user.name
    }
    
    if (session.user.email) {
      return session.user.email.split('@')[0]
    }
    
    return 'User'
  }

  const getUserEmail = () => {
    return session?.user?.email || ''
  }

  const getUserAvatar = () => {
    return session?.user?.image || null
  }

  const login = () => {
    router.push('/auth/signin')
  }

  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return {
    user: session?.user || null,
    ready: isReady,
    authenticated: isAuthenticated,
    login,
    logout,
    getUserDisplayName,
    getUserEmail,
    getUserAvatar,
  }
}