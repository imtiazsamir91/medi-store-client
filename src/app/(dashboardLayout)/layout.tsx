import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSession } from "@/session/user.session";

import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  seller,
  customer,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}) {
  
  const response = await getSession();

  
  const userInfo = response?.data?.user;


  if (!userInfo) {
    redirect("/login");
  }

  
  const role = userInfo.role?.toUpperCase();

  return (
    <SidebarProvider>
      
      <AppSidebar user={userInfo} />
      
      <SidebarInset className="bg-[#F8FAFC] dark:bg-[#020208]">
        
       
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 sticky top-0 z-50 bg-white/60 dark:bg-black/20 backdrop-blur-md">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-emerald-500 uppercase">
              {role} MODE
            </span>
          </div>
        </header>

       
        <main className="flex flex-1 flex-col gap-4 p-6">
          {role === "ADMIN" && admin}
          {role === "SELLER" && seller}
          {role === "CUSTOMER" && customer}
          
        
          {!["ADMIN", "SELLER", "CUSTOMER"].includes(role || "") && (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-destructive font-medium">Invalid Role Access</p>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}