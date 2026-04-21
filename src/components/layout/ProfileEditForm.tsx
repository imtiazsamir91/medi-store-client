"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Phone, ShieldCheck, MapPin, Loader2 } from "lucide-react";

export default function ProfileView() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setSession(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

 
  const user = session?.user;

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-gray-100 dark:border-zinc-800 shadow-xl space-y-8 relative overflow-hidden group">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full" />
      
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-1.5 bg-blue-600 rounded-full" />
          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
              Identity Profile
            </h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
              Verified Member
            </p>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
          {user?.role || "Customer"}
        </div>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div className="group/item">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">
            Account Holder
          </label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent group-hover/item:border-blue-500/20 transition-all">
            <div className="size-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm">
              <User className="text-blue-600 w-5 h-5" />
            </div>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {user?.name || "No Name Provided"}
            </p>
          </div>
        </div>

       
        <div className="group/item">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">
            Primary Email
          </label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent group-hover/item:border-blue-500/20 transition-all">
            <div className="size-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm">
              <Mail className="text-blue-600 w-5 h-5" />
            </div>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {user?.email || "No Email Provided"}
            </p>
          </div>
        </div>

       
        <div className="group/item">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">
            Contact Number
          </label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent group-hover/item:border-blue-500/20 transition-all">
            <div className="size-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm">
              <Phone className="text-blue-600 w-5 h-5" />
            </div>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {user?.phone || "Not Linked"}
            </p>
          </div>
        </div>
      </div>

     
      <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Secure Account</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-zinc-400" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Dhaka, BD</span>
        </div>
      </div>
    </div>
  );
}