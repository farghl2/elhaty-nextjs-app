'use client' 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  Grid, List, Settings  } from 'lucide-react';

// Menu items.
const items = [
  {
    title: "المنيو",
    url: "menu",
    icon: Grid,
  },
  // {
  //   title: "الفئات",
  //   url: "catigories",
  //   icon: List,
  // },
  // {
  //   title: "الاعدادات",
  //   url: "settings",
  //   icon: Settings ,
  // },

]
export function AppSidebar() {
  const pathName = usePathname();
  return (
     <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>لوحة التحكم</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
           
                  <SidebarMenuButton
                  className={`${pathName === `/admin/${item.url}`?'bg-primary text-white py-5  transition ease-in-out  hover:bg-primary hover:text-white':''}`}
                  asChild>
                    <Link  href={item.url}>
                      <item.icon />
                      
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent >
        </SidebarGroup>
      </SidebarContent >
    </Sidebar>
  )
}