import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { userService } from "@/services/user.service"

export default async function DashboardLayout({
  admin,
  seller,
  customer
}: {
  children: React.ReactNode,
  admin: React.ReactNode,
  seller: React.ReactNode,
  customer: React.ReactNode,
}) {
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
       
          {userInfo?.role === "admin" && admin}
          {userInfo?.role === "seller" && seller}
          {userInfo?.role === "customer" && customer}

         
          {!userInfo && <p className="text-center mt-10">Please login to view dashboard.</p>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}