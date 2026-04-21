"use client";
import OrderStatusDropdown from "@/components/layout/OrderStatus";
import { getSellerOrders } from "@/services/medicine.service";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Receipt, Calendar, Settings2, ArrowUpRight, Search, Activity } from "lucide-react";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getSellerOrders();
        setOrders(res.data || []);
      } catch (error) {
        console.error("Seller orders fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08072A] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="size-16 border-2 border-dashed border-[#8686AC] rounded-full blur-[1px]"
        />
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-[#8686AC] animate-pulse">Syncing_Data_Streams</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08072A] text-slate-800 dark:text-[#8686AC] transition-colors duration-1000 relative overflow-hidden">
      
      {/* --- Continuous Motion Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-500/10 dark:bg-[#272757]/30 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-[#505081]/20 blur-[150px] rounded-full" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* --- Header Section --- */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
              <Activity size={18} className="text-[#505081] dark:text-[#8686AC] animate-pulse" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Live_Command_Console</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter">
                Order <span className="dark:text-[#8686AC]/30 font-light italic">Management</span>
              </h1>
              <p className="text-sm font-medium opacity-60 max-w-md italic">
                Real-time synchronization with global distribution nodes.
              </p>
            </div>
            
            {/* Animated Stats Card */}
            <div className="relative group">
               <motion.div 
                 animate={{ opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition"
               />
               <div className="relative bg-white dark:bg-[#0F0E47] border border-black/5 dark:border-white/10 px-8 py-5 rounded-[1.8rem] backdrop-blur-xl">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1 flex items-center gap-2">
                    <div className="size-1.5 bg-emerald-500 rounded-full animate-ping" /> Active_Streams
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white leading-none tracking-tighter">{orders.length}</p>
               </div>
            </div>
          </div>
        </header>

        {/* --- Data Table Container with Continuous Scanner --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group rounded-[40px] overflow-hidden"
        >
          {/* Constant Scanning Line */}
          <motion.div 
            animate={{ y: ["0%", "1000%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 dark:via-[#8686AC]/20 to-transparent z-20 pointer-events-none"
          />

          <div className="overflow-hidden bg-white/70 dark:bg-[#272757]/30 backdrop-blur-3xl border border-white dark:border-white/10 rounded-[40px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-[#505081] dark:text-[#8686AC]">Reference</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Client_Identity</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-center">Settlement</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-center">Status_Link</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-24 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-20">
                         <Search size={40} className="animate-bounce" />
                         <p className="text-xs font-black uppercase tracking-[0.5em]">No_Data_Incoming</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order: any, idx: number) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group/row hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <motion.div 
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                              className="absolute -inset-1 bg-blue-500/20 blur-md rounded-xl opacity-0 group-hover/row:opacity-100 transition-opacity"
                            />
                            <div className="relative size-11 rounded-xl bg-slate-900 dark:bg-[#505081] flex items-center justify-center text-white text-[10px] font-bold border border-white/10 shadow-lg">
                              #{order.id.slice(-4).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-bold dark:text-white group-hover/row:text-blue-500 transition-colors">ORD_SEGMENT</p>
                            <p className="text-[10px] font-mono opacity-40 leading-tight italic">ENCRYPTED_LOG</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                           <div className="size-10 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover/row:rotate-12 transition-transform">
                              <Users size={16} className="opacity-40" />
                           </div>
                           <div>
                              <p className="text-sm font-black dark:text-white uppercase tracking-tight">{order.user?.name || "Unknown_Entity"}</p>
                              <p className="text-[10px] font-medium opacity-50 font-mono tracking-tighter">{order.user?.email}</p>
                           </div>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                        <span className="text-2xl font-bold dark:text-white tracking-tighter dark:bg-gradient-to-b dark:from-white dark:to-[#8686AC] dark:bg-clip-text dark:text-transparent">
                          ${order.total.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-8">
                        <div className="flex justify-center scale-90 group-hover/row:scale-100 transition-all duration-500">
                          <OrderStatusDropdown orderId={order.id} initialStatus={order.status} />
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <button className="group/btn relative inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-[#08072A] text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all active:scale-95 shadow-xl">
                          <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                          <span className="relative z-10">Details</span>
                          <ArrowUpRight size={14} className="relative z-10 group-hover/btn:rotate-45 transition-transform" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Constant Table Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 dark:from-[#505081]/10 dark:to-transparent rounded-[40px] -z-10 blur-[100px]" />
        </motion.div>

        {/* --- Footer Footer Credits --- */}
        <footer className="mt-24 text-center relative">
           <motion.div 
             animate={{ opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="inline-flex flex-col items-center gap-4"
           >
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#8686AC] to-transparent" />
              <p className="text-[9px] font-black uppercase tracking-[1.5em] text-[#8686AC]">Terminal_End_Point // MediStore_v2.4</p>
           </motion.div>
        </footer>
      </div>
    </main>
  );
}