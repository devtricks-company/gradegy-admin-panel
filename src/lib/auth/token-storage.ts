/**
 * Token storage utilities for managing JWT tokens in localStorage
 */

const ACCESS_TOKEN_KEY = 'auth_access_token'
const REFRESH_TOKEN_KEY = 'auth_refresh_token'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

/**
 * Store authentication tokens in localStorage
 */
export const setAuthTokens = (tokens: AuthTokens): void => {
  console.log('this is run')
  if (typeof window === 'undefined') {
    return;
  }


  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
}

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

/**
 * Get both tokens from localStorage
 */
export const getAuthTokens = (): AuthTokens | null => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  if (!accessToken || !refreshToken) return null

  return { accessToken, refreshToken }
}

/**
 * Clear all authentication tokens from localStorage
 */
export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

/**
 * Check if user is authenticated (has valid tokens)
 */
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null
}
