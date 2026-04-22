"use client";

import { Mail, Send, BellRing } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailNewsletter() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#0F0E47] transition-colors duration-500">
      <div className="container mx-auto max-w-5xl">
        
        {/* Background Ambient Glow using your brand colors */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8686AC]/10 blur-[130px] rounded-full -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0F0E47] via-[#272757] to-[#505081] p-10 md:p-20 text-center shadow-[0_20px_50px_rgba(15,14,71,0.3)] border border-[#8686AC]/20"
        >
          {/* Decorative Graphic Element */}
          <div className="absolute -top-10 -right-10 p-10 opacity-5 select-none pointer-events-none">
            <Mail size={250} className="text-white rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            {/* Animated Icon Header */}
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#8686AC]/30 text-[#8686AC]">
                <BellRing className="size-8 animate-[pulse_2s_infinite]" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                STAY IN THE <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8686AC] to-indigo-300">
                  HEALTH LOOP.
                </span>
              </h2>

              <p className="text-[#8686AC] text-sm md:text-lg max-w-md mx-auto leading-relaxed font-medium">
                Get real-time stock alerts, medical insights, and exclusive pharmaceutical offers delivered to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex flex-col md:flex-row gap-3 items-center bg-[#0F0E47]/40 p-2 rounded-2xl md:rounded-full border border-[#505081]/30 backdrop-blur-md focus-within:border-[#8686AC]/50 transition-all"
            >
              <div className="flex items-center gap-4 px-5 w-full">
                <Mail className="text-[#8686AC] size-5" />
                <input 
                  type="email" 
                  placeholder="Enter your professional email..." 
                  className="bg-transparent border-none outline-none text-white w-full py-3 text-sm placeholder:text-[#505081] font-medium"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full md:w-auto px-10 py-4 rounded-xl md:rounded-full bg-[#8686AC] hover:bg-white text-[#0F0E47] font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-black/20"
              >
                Subscribe Now
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            <p className="text-[10px] text-[#505081] uppercase tracking-[0.3em] font-bold">
              No spam. Just essential healthcare updates.
            </p>
          </div>

          {/* Bottom Left Accent Glow */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#8686AC]/20 rounded-full blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
}