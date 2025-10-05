'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to the admin panel{user?.email ? `, ${user.email}` : ''}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Organizations</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Active organizations in the system
            </p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Admins</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Active administrators
            </p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Active Users</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Users logged in this week
            </p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">System Status</h3>
            </div>
            <div className="text-2xl font-bold">Operational</div>
            <p className="text-xs text-muted-foreground">
              All systems running normally
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
