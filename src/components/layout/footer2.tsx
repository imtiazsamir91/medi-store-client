"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Send, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer2 = () => {
  return (
    <footer className="relative w-full py-12 overflow-hidden border-t border-[#505081]/20 dark:border-white/10 transition-colors duration-500">
      
      <div className="absolute inset-0 z-0">
      
        <div className="absolute inset-0 bg-[#8686AC]/5 dark:bg-[#0F0E47]/95 backdrop-blur-xl transition-colors duration-500" />
        
       
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
          }}
        />
        
      
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-[#8686AC]/20 dark:bg-[#505081]/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
       
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
             
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#272757] to-[#8686AC] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6">
                <Sparkles className="size-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-[#0F0E47] dark:text-white uppercase">
                  Medi<span className="text-[#8686AC]">Store</span>
                </span>
                <span className="text-[7px] uppercase tracking-[0.5em] text-[#505081] dark:text-white/30 font-bold">Premium Pharma</span>
              </div>
            </Link>
            <p className="text-xs text-[#505081] dark:text-white/40 font-medium leading-relaxed max-w-[240px]">
              High-fidelity healthcare assets and digital synchronization using premium pharma standards.
            </p>
          </div>

        
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#272757] dark:text-[#8686AC]">Market</h3>
              <ul className="space-y-2">
                {["Catalog", "Pricing", "Auth"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[11px] font-medium text-[#505081] dark:text-white/30 hover:text-[#272757] dark:hover:text-white transition-all">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#272757] dark:text-[#8686AC]">Legal</h3>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Support"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[11px] font-medium text-[#505081] dark:text-white/30 hover:text-[#272757] dark:hover:text-white transition-all">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
          <div className="md:col-span-4">
            <h4 className="text-[#0F0E47] dark:text-white text-[9px] font-black uppercase tracking-[0.2em] mb-4 italic">Neural Newsletter</h4>
            <div className="flex gap-2 p-1 bg-[#8686AC]/10 dark:bg-black/20 rounded-xl border border-[#505081]/20 dark:border-white/5 backdrop-blur-sm">
              <Input 
                placeholder="Email sync..." 
                className="bg-transparent border-none focus-visible:ring-0 text-[#0F0E47] dark:text-white placeholder:text-[#505081]/50 dark:placeholder:text-white/10 h-9 text-[11px]" 
              />
              <Button size="sm" className="h-9 px-4 rounded-lg bg-[#272757] dark:bg-[#8686AC] hover:bg-[#0F0E47] dark:hover:bg-white text-white dark:text-[#0F0E47] font-bold transition-all">
                <Send size={12} />
              </Button>
            </div>
          </div>

        </div>

    
        <div className="mt-12 pt-6 border-t border-[#505081]/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-bold uppercase tracking-[0.2em] text-[#505081] dark:text-white/10">
          <p>© 2026 MediStore. All rights reserved.</p>
          <div className="flex gap-6">
            <Twitter size={14} className="hover:text-[#272757] dark:hover:text-[#8686AC] transition-all cursor-pointer" />
            <Instagram size={14} className="hover:text-[#272757] dark:hover:text-[#8686AC] transition-all cursor-pointer" />
            <Linkedin size={14} className="hover:text-[#272757] dark:hover:text-[#8686AC] transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};