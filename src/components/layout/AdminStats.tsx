"use client";

import React from 'react';
import { Users, ShoppingBag, DollarSign, Pill, UserCheck, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

export default function AdminStatsClient({ statsData }: { statsData: any }) {
  const stats = [
    {
      label: "Total Revenue",
      value: `$${(statsData.totalRevenue || 0).toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
      color: "emerald",
      border: "border-emerald-500/20",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.1)]"
    },
    {
      label: "Total Customers",
      value: (statsData.totalCustomers || 0).toLocaleString(),
      icon: <Users className="w-6 h-6 text-blue-400" />,
      color: "blue",
      border: "border-blue-500/20",
      glow: "shadow-[0_0_20px_rgba(96,165,250,0.1)]"
    },
    {
      label: "Total Sellers",
      value: (statsData.totalSellers || 0).toLocaleString(),
      icon: <UserCheck className="w-6 h-6 text-orange-400" />,
      color: "orange",
      border: "border-orange-500/20",
      glow: "shadow-[0_0_20px_rgba(251,146,60,0.1)]"
    },
    {
      label: "Admin Count",
      value: (statsData.totalAdmins || 0).toLocaleString(),
      icon: <ShieldCheck className="w-6 h-6 text-[#8686AC]" />,
      color: "purple",
      border: "border-[#8686AC]/20",
      glow: "shadow-[0_0_20px_rgba(134,134,172,0.1)]"
    },
    {
      label: "Total Medicines",
      value: (statsData.totalMedicines || 0).toLocaleString(),
      icon: <Pill className="w-6 h-6 text-rose-400" />,
      color: "rose",
      border: "border-rose-500/20",
      glow: "shadow-[0_0_20px_rgba(251,113,133,0.1)]"
    },
    {
      label: "Total Orders",
      value: (statsData.totalOrders || 0).toLocaleString(),
      icon: <ShoppingBag className="w-6 h-6 text-purple-400" />,
      color: "purple",
      border: "border-purple-500/20",
      glow: "shadow-[0_0_20px_rgba(192,132,252,0.1)]"
    },
  ];

  return (
    <div className="p-4 space-y-10">
      {/* হেডার সেকশন */}
      <div className="flex flex-col gap-2 border-l-4 border-[#8686AC] pl-6 py-1">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
          Platform <span className="text-[#8686AC]">Pulse</span>
          <Zap className="size-5 text-emerald-500 animate-pulse" />
        </h1>
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">
          Real-time Administrative Analytics
        </p>
      </div>

      {/* কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={cn(
              "group relative p-8 rounded-[35px] border backdrop-blur-3xl overflow-hidden cursor-pointer transition-all duration-500",
              "bg-[#0F0E47]/10 hover:bg-white/[0.04]",
              stat.border,
              stat.glow
            )}
          >
            {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none">
              <TrendingUp className="w-24 h-24 -rotate-12" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner group-hover:border-white/20 transition-all">
                  {stat.icon}
                </div>
                <div className="h-[1px] flex-grow mx-6 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div>
                <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl font-black text-white tracking-tighter">
                    {stat.value}
                  </h3>
                  <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <TrendingUp size={12} /> +12%
                  </div>
                </div>
              </div>
            </div>

            {/* বটম হাইলাইট লাইন */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}