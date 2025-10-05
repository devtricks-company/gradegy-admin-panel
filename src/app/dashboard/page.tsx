'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to the admin panel dashboard{user?.email ? `, ${user.email}` : ''}.
              </p>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
              <p className="text-muted-foreground">
                You are now authenticated and can access the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
