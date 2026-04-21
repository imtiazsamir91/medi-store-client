"use client";
import { getMyOrders } from "@/services/medicine.service";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Calendar, MapPin, Hash, PackageCheck, DollarSign, ArrowRight, Activity, Sparkles, Orbit } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data || []);
      } catch (error) {
        console.error("Order fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08072A] flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="size-24 rounded-3xl border-2 border-[#8686AC]/30 flex items-center justify-center relative"
        >
          <Orbit className="text-[#8686AC] animate-spin-slow" size={40} />
          <div className="absolute inset-0 bg-[#505081] blur-[60px] opacity-20" />
        </motion.div>
        <p className="mt-10 text-[10px] font-black uppercase tracking-[0.8em] text-[#8686AC]/50">Synchronizing_Sequence</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08072A] text-slate-800 dark:text-[#8686AC] transition-colors duration-1000 relative overflow-x-hidden">
      
      {/* --- Ultra-Premium Background Assets --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-400/10 dark:bg-[#272757]/30 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-400/10 dark:bg-[#505081]/20 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* --- Cyberpunk Header --- */}
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#8686AC]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8686AC]">Secure_Archive_Access</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-9xl font-bold tracking-tighter text-slate-900 dark:text-white leading-none"
              >
                My <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-white/10">Orders</span>
              </motion.h1>
              <p className="text-lg font-medium dark:text-[#8686AC]/60 italic max-w-md">
                Detailed transaction logs for distributed medical assets.
              </p>
            </div>

            <Link href="/shop" className="group relative px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-[#08072A] rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-4">
                Access Marketplace <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center rounded-[50px] border border-dashed border-slate-200 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-xl">
             <ShoppingBag className="size-20 mb-6 opacity-10" />
             <p className="font-bold opacity-30 uppercase tracking-[0.3em]">No Transactions Found</p>
          </div>
        ) : (
          <div className="grid gap-20">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                {/* ID Tag Floating */}
                <div className="absolute -top-6 left-12 px-6 py-2 bg-slate-900 dark:bg-[#505081] text-white rounded-full text-[10px] font-black tracking-widest z-20 shadow-xl group-hover:bg-[#8686AC] transition-colors">
                  ORDER_HASH_{order.id.slice(-6).toUpperCase()}
                </div>

                {/* --- The Glass Card Body --- */}
                <div className="relative z-10 bg-white/80 dark:bg-[#272757]/30 backdrop-blur-3xl border border-white dark:border-white/10 rounded-[60px] p-10 md:p-16 transition-all duration-700 group-hover:border-[#8686AC]/40 group-hover:bg-white dark:group-hover:bg-[#272757]/50">
                  
                  <div className="flex flex-col xl:flex-row justify-between gap-16">
                    <div className="space-y-10 flex-1">
                      {/* Order Info Grid */}
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest dark:text-[#8686AC]/40 mb-3 flex items-center gap-2">
                             <Calendar size={12}/> Protocol_Date
                          </p>
                          <h4 className="text-xl font-bold dark:text-white">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest dark:text-[#8686AC]/40 mb-3 flex items-center gap-2">
                             <Activity size={12}/> Current_Status
                          </p>
                          <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-tighter uppercase ${
                            order.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="space-y-4">
                         <p className="text-[10px] font-black uppercase tracking-widest dark:text-[#8686AC]/40">Items_Distributed</p>
                         <div className="flex flex-wrap gap-4">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex items-center gap-4 bg-slate-100 dark:bg-[#08072A]/50 px-6 py-4 rounded-[24px] border border-transparent hover:border-[#8686AC]/30 transition-all">
                                <span className="text-2xl">💊</span>
                                <div>
                                   <p className="text-sm font-black dark:text-white uppercase">{item.medicine.name}</p>
                                   <p className="text-[10px] font-bold opacity-50 italic">Unit Price: ${item.price}</p>
                                </div>
                                <div className="ml-4 size-8 flex items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-black">
                                  {item.quantity}
                                </div>
                              </div>
                            ))}
                         </div>
                      </div>
                    </div>

                    {/* Costing Section */}
                    <div className="xl:text-right flex flex-col justify-between items-end">
                      <div className="space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] dark:text-[#8686AC]/40">Aggregate_Total</p>
                        <h2 className="text-7xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tighter">
                          ${order.total.toLocaleString()}
                        </h2>
                      </div>
                      <div className="mt-12 flex items-center gap-4 text-[11px] font-bold dark:text-[#8686AC]/60 bg-slate-100 dark:bg-white/5 px-6 py-3 rounded-2xl">
                        <MapPin size={16} className="text-[#8686AC]" />
                        <span className="uppercase tracking-widest">{order.shippingAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Decoration */}
                  <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {[1,2,3].map(i => <div key={i} className="size-1.5 rounded-full bg-[#8686AC]/30" />)}
                    </div>
                    <div className="flex items-center gap-3 opacity-20">
                       <PackageCheck size={18} />
                       <span className="text-[9px] font-black uppercase tracking-[0.5em]">Ledger_Verified_v4</span>
                    </div>
                  </div>
                </div>

                {/* Animated Background Aura on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-[#505081]/20 dark:to-transparent rounded-[60px] -z-10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-95 group-hover:scale-105" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <footer className="py-32 text-center opacity-20">
         <div className="flex flex-col items-center gap-6">
            <Sparkles className="animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[2em]">MediStore Archive Systems</p>
         </div>
      </footer>
    </main>
  );
}