import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Toaster } from "@/components/ui/sonner"


const AdminLayout = ({children}:{children: React.ReactNode}) => {
  return (
      <SidebarProvider >
      <AppSidebar />
      <main className="w-full rtl">
        <SidebarTrigger/>
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout