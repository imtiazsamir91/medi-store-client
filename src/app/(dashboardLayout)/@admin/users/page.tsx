import UserActionDropdown from "@/components/layout/UserActionDropdown";
import { getAllUsers } from "@/services/medicine.service";
import React from "react";

export default async function ManageUsersPage() {
  const response = await getAllUsers();
  const users = response?.data || [];

  return (
    <div className="p-4 md:p-8 min-h-screen bg-transparent text-white selection:bg-[#8686AC]/30">
      
      {/* Header Section */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#8686AC]"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8686AC]">Core System</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-b from-white to-[#8686AC] bg-clip-text text-transparent tracking-tighter">
            User Management
          </h1>
          <p className="text-[#8686AC]/70 mt-3 font-medium max-w-md leading-relaxed text-sm md:text-base">
            Control access, monitor roles, and manage user permissions within your secure ecosystem.
          </p>
        </div>
        
        <button className="relative group w-full md:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#272757] via-[#505081] to-[#8686AC] text-white font-bold text-sm transition-all hover:shadow-[0_0_40px_rgba(134,134,172,0.5)] hover:scale-[1.05] active:scale-95 overflow-hidden">
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Create Account
          </span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="relative rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-[#0F0E47]/30 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        
        {/* Decorative Ambient Light */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#505081]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#272757]/30 blur-[120px] pointer-events-none" />

        <div className="overflow-x-auto px-2 md:px-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            {/* Desktop Header - Hidden on Mobile */}
            <thead className="hidden md:table-header-group">
              <tr className="text-[#8686AC]/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Access Role</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-right">Settings</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/[0.03] md:divide-none">
              {users.map((user: any) => (
                <tr 
                  key={user.id} 
                  className="group flex flex-col md:table-row hover:bg-white/[0.03] transition-all duration-500 ease-out border-b border-white/5 md:border-none py-4 md:py-0"
                >
                  {/* Identity Column */}
                  <td className="px-4 md:px-8 py-2 md:py-7">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-[#8686AC] blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative p-[1.5px] rounded-xl md:rounded-2xl bg-gradient-to-br from-white/20 to-transparent">
                          <div className="bg-[#1a194d] rounded-[10px] md:rounded-[14px] size-10 md:size-14 flex items-center justify-center text-lg md:text-xl font-black text-white group-hover:text-[#8686AC] transition-colors">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-base md:text-lg text-white group-hover:translate-x-1 transition-transform duration-300 tracking-tight truncate">
                          {user.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-[#8686AC] font-semibold tracking-wide uppercase opacity-60 italic truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Access Role Column */}
                  <td className="px-4 md:px-8 py-2 md:py-7">
                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/[0.03] border border-white/5 text-[#8686AC] group-hover:border-[#505081] transition-all duration-500">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8686AC] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8686AC]"></span>
                      </span>
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                    </div>
                  </td>

                  {/* Settings Column */}
                  <td className="px-4 md:px-8 py-2 md:py-7 text-right">
                    <div className="inline-block transform opacity-100 md:opacity-40 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300">
                      <UserActionDropdown user={user} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info - Hidden on tiny screens or stack */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-2 px-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#8686AC]/30">
        <span>Active Directory: v2.4.0</span>
        <span className="hidden sm:block">Secure Terminal Active</span>
      </div>
    </div>
  );
}