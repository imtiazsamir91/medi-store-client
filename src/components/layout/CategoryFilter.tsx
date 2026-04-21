"use client";

import { Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryFilter({ categories, selectedId, onSelect }: any) {
  return (
    <div className="w-full">
    
      <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-start">
        
        {/* All Items বাটন */}
        <button
          onClick={() => onSelect(null)}
          className={`relative px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 group border
            ${!selectedId 
              ? "text-white border-transparent shadow-2xl shadow-blue-500/10" 
              : "text-[#8686AC] border-white/5 bg-white/[0.03] hover:border-[#8686AC]/40 hover:text-white"
            }`}
        >
          {!selectedId && (
            <motion.div 
              layoutId="activeGlow"
              className="absolute inset-0 bg-gradient-to-br from-[#272757] via-[#505081] to-[#0F0E47]" 
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {!selectedId && <div className="size-1.5 rounded-full bg-blue-400 animate-pulse" />}
            All Formulations
          </span>
        </button>

        {/* ক্যাটাগরি বাটনসমূহ */}
        {categories?.map((category: any) => {
          const isActive = selectedId === category._id || selectedId === category.id;
          
          return (
            <button
              key={category._id || category.id}
              onClick={() => onSelect(category._id || category.id)}
              className={`relative flex items-center gap-3 px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 group border
                ${isActive 
                  ? "text-white border-transparent shadow-2xl shadow-purple-500/10" 
                  : "text-[#8686AC] border-white/5 bg-white/[0.03] hover:border-[#8686AC]/40 hover:text-white"
                }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-br from-[#8686AC] via-[#505081] to-[#272757]" 
                />
              )}
              
              <Layers className={`relative z-10 w-4 h-4 transition-colors ${isActive ? "text-white" : "text-[#8686AC] group-hover:text-white"}`} />
              <span className="relative z-10">{category.name}</span>
              
              <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-white/10 pointer-events-none" />
            </button>
          );
        })}
      </div>

     
      <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}