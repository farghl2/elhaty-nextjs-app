import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

const AdminLayout = ({children}:{children: React.ReactNode}) => {
  return (
      <SidebarProvider >
      <AppSidebar />
      <main className="w-full rtl">
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout