import { UserRole } from '@/lib/api/generated/schemas'

/**
 * Allowed roles for admin panel access
 */
export const ALLOWED_ADMIN_ROLES: UserRole[] = [
  UserRole.ultra,
  UserRole.super,
  UserRole.admin,
]

/**
 * Check if a user role is allowed to access the admin panel
 */
export const isAllowedRole = (role: UserRole | string): boolean => {
  return ALLOWED_ADMIN_ROLES.includes(role as UserRole)
}

/**
 * Get human-readable role names
 */
export const getRoleDisplayName = (role: UserRole | string): string => {
  const roleMap: Record<string, string> = {
    [UserRole.ultra]: 'Ultra Admin',
    [UserRole.super]: 'Super Admin',
    [UserRole.admin]: 'Admin',
    [UserRole.student]: 'Student',
  }
  return roleMap[role] || role
}
