import * as React from "react"


import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SearchForm } from "./search-form"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { sellerRoutes } from "@/routes/sellerRoutes"

// This is sample data.


export function AppSidebar({ 
  user,
  ...props
 }: {user:{role:string}}& React.ComponentProps<typeof Sidebar>) {

let routes: typeof adminRoutes = []
  switch(user.role){
    case"admin":
    routes=adminRoutes;
    break;
    case"seller":
    routes=sellerRoutes;
    break;

    default:
      routes=[]
      break

  }

  return (
    <Sidebar {...props}>
     
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
