"use client";

import { Sparkles, ShieldCheck, Zap, Activity } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white dark:bg-[#0F0E47] transition-colors duration-500">
      
     
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#8686AC]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#272757]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
         
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8686AC]/10 border border-[#8686AC]/20">
              <Sparkles className="size-4 text-[#8686AC]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#505081] dark:text-[#8686AC]">
                The Future of Pharma
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0F0E47] dark:text-white leading-tight">
              Revolutionizing <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#272757] via-[#505081] to-[#8686AC] dark:from-[#8686AC] dark:to-[#505081]">
                Healthcare Access.
              </span>
            </h2>

            <p className="text-sm md:text-base text-[#505081] dark:text-white/60 leading-relaxed max-w-xl">
              At **MediStore**, we bridge the gap between technology and healthcare. 
              Our platform is designed to provide a seamless, high-fidelity experience 
              for both sellers and customers, ensuring that life-saving medications 
              are always within reach.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="p-2 h-fit rounded-lg bg-[#272757]/5 dark:bg-white/5 text-[#272757] dark:text-[#8686AC]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0E47] dark:text-white text-sm">Verified Quality</h4>
                  <p className="text-xs text-[#505081] dark:text-white/40">100% authentic medicine sourcing.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 h-fit rounded-lg bg-[#272757]/5 dark:bg-white/5 text-[#272757] dark:text-[#8686AC]">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F0E47] dark:text-white text-sm">Instant Sync</h4>
                  <p className="text-xs text-[#505081] dark:text-white/40">Real-time stock and order tracking.</p>
                </div>
              </div>
            </div>
          </div>

         
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#272757] to-[#8686AC] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-[#272757]/50 backdrop-blur-xl border border-[#505081]/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F0E47] to-[#8686AC] flex items-center justify-center">
                    <Activity className="text-white size-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#8686AC] tracking-[0.2em]">Our Mission</p>
                    <h3 className="text-lg font-black text-[#0F0E47] dark:text-white uppercase tracking-tighter">MediStore Labs</h3>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-lg italic font-medium text-[#505081] dark:text-white/80 border-l-4 border-[#8686AC] pl-4">
                "Driven by data, inspired by life. We are committed to making digital pharma accessible, transparent, and ultra-fast for everyone."
              </blockquote>

              <div className="mt-8 pt-6 border-t border-[#505081]/10 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#8686AC]" />
                <div>
                  <p className="text-xs font-bold text-[#0F0E47] dark:text-white">Imtiaz Rahman Samir</p>
                  <p className="text-[10px] text-[#505081] dark:text-[#8686AC] uppercase font-bold tracking-widest">Lead Backend Engineer</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}