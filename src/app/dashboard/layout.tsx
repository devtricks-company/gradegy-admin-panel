import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Gradegy Admin Panel</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
