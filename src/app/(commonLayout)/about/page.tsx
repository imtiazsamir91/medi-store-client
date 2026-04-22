"use client";

import { Sparkles, ShieldCheck, Zap, Activity, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // এটি ব্যবহার করলে ডিজাইন আরও প্রাণবন্ত হবে

export default function AboutSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0A33] transition-colors duration-500">
      
      {/* Background Orbs - সুক্ষ্ম এবং আধুনিক কালার প্যালেট */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <Sparkles className="size-4 text-indigo-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                The Future of Pharma
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F0E47] dark:text-white leading-[1.1]">
              Better Health <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400">
                Starts With Access.
              </span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              At <span className="font-bold text-[#0F0E47] dark:text-white">MediStore</span>, we don&apos;t just deliver medicine; we deliver peace of mind. Our high-fidelity ecosystem connects pharmacists and patients through a fast, secure, and transparent digital experience.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="group flex gap-4 transition-transform hover:translate-x-2">
                <div className="flex-shrink-0 p-3 h-fit rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-slate-200 dark:border-white/10 text-blue-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0E47] dark:text-white text-base">Verified Quality</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">100% authentic medicine sourcing from certified labs.</p>
                </div>
              </div>

              <div className="group flex gap-4 transition-transform hover:translate-x-2">
                <div className="flex-shrink-0 p-3 h-fit rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-slate-200 dark:border-white/10 text-indigo-500">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0E47] dark:text-white text-base">Instant Sync</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Real-time inventory management and live tracking.</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400 hover:gap-4 transition-all">
              Learn more about our mission <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Right Card Area - Glassmorphism Effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
            
            <div className="relative bg-white/70 dark:bg-[#1A1951]/50 backdrop-blur-2xl border border-white dark:border-white/10 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Activity className="text-white size-7" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-[0.3em]">Core Vision</p>
                    <h3 className="text-xl font-black text-[#0F0E47] dark:text-white tracking-tight">MediStore Labs</h3>
                  </div>
                </div>
                <Heart className="text-red-400 animate-bounce" fill="currentColor" size={20} />
              </div>
              
              <div className="relative">
                <span className="absolute -top-8 -left-4 text-6xl text-indigo-500/20 font-serif inline-block">“</span>
                <p className="text-xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic relative z-10">
                  Driven by data, inspired by life. We are committed to making digital pharma accessible, transparent, and ultra-fast for everyone.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-300 overflow-hidden">
                    {/* এখানে আপনার ইমেজ দিতে পারেন */}
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Imtiaz" alt="Profile" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[#0F0E47] dark:text-white">Imtiaz Rahman Samir</p>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold uppercase tracking-wider">Lead Backend Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}