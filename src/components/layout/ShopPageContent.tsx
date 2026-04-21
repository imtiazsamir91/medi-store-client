"use client";

import { useState } from "react";
import { Product } from "@/types";
import CategoryFilter from "./CategoryFilter";
import MedicineCard from "../modules/homepage/medicineCard";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Sparkles, LayoutGrid } from "lucide-react";

interface ShopPageContentProps {
  categories: any[];
  allProducts: Product[];
}

export default function ShopPageContent({ 
  categories = [], 
  allProducts = [] 
}: ShopPageContentProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // ফিল্টারিং লজিক
  const filteredProducts = (allProducts || []).filter((product: any) => {
    if (!selectedCategoryId) return true;
    const productCatId = product.category?._id || product.category?.id || product.categoryId;
    return productCatId === selectedCategoryId;
  });

  return (
    <div className="container mx-auto px-4 pt-36 pb-20 min-h-screen">
      
    
      <div className="relative mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-10"
        >
         
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              MediStore <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8686AC] via-white/90 to-[#505081]">
                Collection
              </span>
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#8686AC]" />
              <p className="text-[#8686AC] text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black italic">
                Premium Pharmaceutical Excellence
              </p>
            </div>
          </div>

          
          <div className="flex flex-wrap items-center gap-6 p-1 border-b border-white/5 pb-8">
            <motion.div 
              key={filteredProducts.length}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 bg-[#272757]/30 px-5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl"
            >
              <Box className="size-4 text-[#8686AC]" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-[#8686AC] uppercase tracking-widest">In Stock</span>
                <span className="text-sm font-black text-white leading-none">
                  {filteredProducts.length} Formulations
                </span>
              </div>
              <Sparkles className="size-3 text-blue-400 animate-pulse ml-2" />
            </motion.div>

            <div className="flex items-center gap-3 px-5 py-2.5">
              <LayoutGrid className="size-4 text-[#8686AC]" />
              <span className="text-[10px] font-black text-[#8686AC] uppercase tracking-widest leading-none">
                Curated Selection
              </span>
            </div>
          </div>
        </motion.div>
        
        
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#272757]/20 blur-[120px] rounded-full -z-10" />
      </div>

    
      <div className="mb-20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-[#8686AC] animate-ping" />
          <h2 className="text-[10px] font-black text-[#8686AC] uppercase tracking-[0.4em]">Browse Categories</h2>
        </div>
        <CategoryFilter 
          categories={categories} 
          selectedId={selectedCategoryId} 
          onSelect={setSelectedCategoryId} 
        />
      </div>

      
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <motion.div
                layout
                key={(product as any)._id || product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MedicineCard product={product} />
              </motion.div>
            ))
          ) : (
            /* এম্পটি স্টেট ডিজাইন */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-48 rounded-[60px] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 border-dashed"
            >
              <div className="relative size-32 bg-[#0F0E47] border border-white/10 rounded-full flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(39,39,87,0.4)]">
                <span className="text-6xl grayscale opacity-50">🔬</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Inventory Exhausted</h3>
              <p className="text-[#8686AC] font-bold uppercase tracking-[0.4em] text-[10px] mt-4">
                No medicines match the selected criteria
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}