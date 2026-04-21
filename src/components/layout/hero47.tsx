"use client";

import { ArrowUpRight, Play, Settings, DatabaseBackup, BotMessageSquare, ShieldCheck, Activity, Target } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";


const colors = {
  deepBlue: "#272757",
  lightPurple: "#8686AC",
  midSlate: "#505081",
  darkNavy: "#0F0E47",
};

export const Hero47 = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-background py-16">
      
     
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[5%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20"
          style={{ background: colors.lightPurple }}
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-15"
          style={{ background: colors.deepBlue }}
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
        
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                <Settings className="w-3 h-3 text-primary animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Next-Gen Pharma Systems</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.9]">
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-r"
                  style={{ backgroundImage: `linear-gradient(90deg, ${colors.darkNavy}, ${colors.lightPurple}, ${colors.midSlate})` }}
                >
                  MediStore Elite
                </span> <br />
                <span className="italic font-serif opacity-90" style={{ color: colors.lightPurple }}>
                  Health Innovation
                </span>
              </h1>
            </div>

            <p className="max-w-md text-lg text-muted-foreground leading-relaxed border-l-2 pl-5" style={{ borderColor: colors.midSlate }}>
              Seamlessly manage your pharmaceutical supply chain with our high-tech, automated distribution ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* <Button 
                size="lg"
                className="h-14 px-10 rounded-2xl font-bold shadow-2xl transition-transform hover:scale-105"
                style={{ backgroundColor: colors.darkNavy, color: "white" }}
              >
                Get Started <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button> */}
              {/* <Button variant="ghost" size="lg" className="h-14 px-8 font-semibold">
                <Play className="mr-2 w-4 h-4 fill-current" /> Watch Demo
              </Button> */}
            </div>
          </motion.div>

        
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] flex items-center justify-center">
              
              
              <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                <motion.circle
                  cx="50%" cy="50%" r="48%"
                  fill="none"
                  stroke={colors.lightPurple}
                  strokeWidth="2"
                  strokeDasharray="100 300"
                  animate={{ strokeDashoffset: [0, -400] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  cx="50%" cy="50%" r="46%"
                  fill="none"
                  stroke={colors.deepBlue}
                  strokeWidth="2"
                  strokeDasharray="150 250"
                  animate={{ strokeDashoffset: [400, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              
              <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-background bg-[#0F0E47]/10 flex items-center justify-center shadow-inner group">
               
                <img 
                  src="/hero.png" 
                  alt="MediStore UI" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#0F0E47] via-transparent to-transparent">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <DatabaseBackup className="w-16 h-16 mb-4" style={{ color: colors.lightPurple }} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">REAL-TIME HUB</h3>
                  <p className="text-xs text-white/60 uppercase tracking-widest mt-1">Synchronized Logistics</p>
                </div>
              </div>

              
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 z-20 p-4 rounded-2xl backdrop-blur-2xl border border-white/20 bg-white/5 shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase">Efficiency</p>
                    <p className="text-xs font-bold text-white">99.8% Active</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-6 bottom-1/4 z-20 p-4 rounded-2xl backdrop-blur-2xl border border-white/20 bg-white/5 shadow-2xl hidden md:block"
              >
                <ShieldCheck className="w-5 h-5 text-blue-400 mb-1" />
                <p className="text-[10px] font-bold text-white/40 uppercase">System</p>
                <p className="text-xs font-bold text-white">Enterprise Grade</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};