import { AppLayoutContent, AppSidebar } from "@/shared/components/layout"
import { SidebarProvider } from "@/shared/contexts/sidebar-context"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <AppLayoutContent>{children}</AppLayoutContent>
      </div>
    </SidebarProvider>
  )
}
