'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, clearAuthTokens } from '@/lib/auth/token-storage'
import { useAuthControllerMe } from '@/lib/api/generated/auth/auth'
import { isAllowedRole } from '@/lib/auth/roles'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  logout: () => void
  refetchUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const router = useRouter()

  // Fetch user profile if authenticated
  const { data: user, isLoading: isUserLoading, error, refetch } = useAuthControllerMe({
    query: {
      enabled: isAuthenticated(),
      retry: false,
    },
  })

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = isAuthenticated()
    setIsAuth(authStatus)
    setIsInitializing(false)
  }, [])

  useEffect(() => {
    // If there's an error fetching user (e.g., invalid token), clear auth
    if (error) {
      setIsAuth(false)
      clearAuthTokens()
    } else if (user) {
      // Check if user has an allowed role
      const userRole = (user as any)?.role

      if (userRole && isAllowedRole(userRole)) {
        setIsAuth(true)
      } else {
        // User doesn't have admin privileges, logout
        setIsAuth(false)
        clearAuthTokens()
        router.push('/login')
      }
    }
  }, [user, error, router])

  const logout = () => {
    clearAuthTokens()
    setIsAuth(false)
    router.push('/login')
  }

  const refetchUser = () => {
    const authStatus = isAuthenticated()
    setIsAuth(authStatus)
    if (authStatus) {
      refetch()
    }
  }

  const value: AuthContextType = {
    isAuthenticated: isAuth,
    isLoading: isInitializing || isUserLoading,
    user: user || null,
    logout,
    refetchUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
