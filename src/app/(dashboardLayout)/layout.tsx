import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { userService } from "@/services/user.service"

export default async function DashboardLayout(props: {
  admin: React.ReactNode,
  seller: React.ReactNode,
  customer: React.ReactNode,
}) {
  
  const { admin, seller, customer } = props;
  
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  if (!userInfo) return null; 

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      
      <SidebarInset className="bg-[#F8FAFC] dark:bg-[#020208] transition-colors duration-500 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/20 backdrop-blur-md px-6 sticky top-0 z-50">
          <SidebarTrigger className="-ml-1 text-slate-500 dark:text-[#8686AC]" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-black/10 dark:bg-white/10" />
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-600 dark:text-emerald-500 bg-blue-500/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-blue-500/20 dark:border-emerald-500/20">
              {userInfo.role} MODE
            </span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-6 relative z-10">
          {userInfo.role === "ADMIN" && admin}
          {userInfo.role === "SELLER" && seller}
          {userInfo.role === "CUSTOMER" && customer}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}