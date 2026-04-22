"use client";
import OrderStatusDropdown from "@/components/layout/OrderStatus";
import { getSellerOrders } from "@/services/medicine.service";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShoppingBag, User, DollarSign, Activity } from "lucide-react";
import OrderDetailsModal from "@/components/layout/OrderDetailsModal";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDetailsClick = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#08072A] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="size-16 border-2 border-dashed border-[#8686AC] rounded-full blur-[1px]"
        />
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-[#8686AC] animate-pulse">Syncing_Data_Streams</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#08072A] text-slate-800 dark:text-[#8686AC] transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-500/10 dark:bg-[#272757]/30 blur-[100px] md:blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/10 dark:bg-[#505081]/20 blur-[100px] md:blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 relative z-10">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-tight">
                Order <span className="text-slate-400 dark:text-[#8686AC]/30 font-light italic">Management</span>
              </h1>
            </div>
            <div className="inline-flex items-center gap-4 bg-slate-100 dark:bg-[#0F0E47] border border-slate-200 dark:border-white/10 px-6 py-4 rounded-3xl backdrop-blur-xl">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Total Loads</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{orders.length}</p>
            </div>
          </div>
        </header>

        {/* --- ডেস্কটপ টেবিল ভিউ (Hidden on Mobile) --- */}
        <div className="hidden lg:block relative rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#272757]/30 backdrop-blur-3xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-[#8686AC]">Reference</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-[#8686AC]">Client</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-[#8686AC] text-center">Settlement</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-[#8686AC] text-center">Status</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-[#8686AC] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-900 dark:text-white">
              {orders.map((order: any) => (
                <tr key={order.id} className="group/row hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all">
                  <td className="p-8">
                    <div className="size-11 rounded-xl bg-slate-900 dark:bg-[#505081] flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                      #{order.id.slice(-4).toUpperCase()}
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="text-sm font-black uppercase">{order.user?.name}</p>
                    <p className="text-[10px] font-medium opacity-50">{order.user?.email}</p>
                  </td>
                  <td className="p-8 text-center font-black text-lg">${order.total.toLocaleString()}</td>
                  <td className="p-8 text-center">
                    <OrderStatusDropdown orderId={order.id} initialStatus={order.status} />
                  </td>
                  <td className="p-8 text-right">
                    <button 
                      onClick={() => handleDetailsClick(order)} 
                      className="group/btn relative inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-[#08072A] text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all active:scale-95"
                    >
                      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10">Details</span>
                      <ArrowUpRight size={14} className="relative z-10 group-hover/btn:rotate-45 transition-transform duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- মোবাইল কার্ড ভিউ (Visible on Mobile) --- */}
        <div className="lg:hidden flex flex-col gap-6">
          {orders.map((order: any) => (
            <div 
              key={order.id} 
              className="bg-white dark:bg-[#272757]/30 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="size-12 rounded-2xl bg-slate-900 dark:bg-[#505081] flex items-center justify-center text-white text-[10px] font-bold">
                  #{order.id.slice(-4).toUpperCase()}
                </div>
                <OrderStatusDropdown orderId={order.id} initialStatus={order.status} />
              </div>

              {/* Client Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl">
                  <User size={18} className="text-slate-900 dark:text-[#8686AC]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-500 dark:text-[#8686AC]/50">Customer</p>
                  <p className="text-base font-black text-slate-900 dark:text-white uppercase">{order.user?.name}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-6">
                <div className="flex items-center gap-3">
                  <DollarSign size={16} className="text-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Settlement</span>
                </div>
                <p className="text-xl font-black text-slate-900 dark:text-white">${order.total.toLocaleString()}</p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleDetailsClick(order)} 
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-[#08072A] text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Details <ArrowUpRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <OrderDetailsModal 
          order={selectedOrder} 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }} 
        />

        <footer className="mt-20 text-center">
          <p className="text-[9px] font-black uppercase tracking-[1em] text-slate-400 dark:text-[#8686AC]/30">Terminal_End_Point // MediStore_v2.4</p>
        </footer>
      </div>
    </main>
  );
}