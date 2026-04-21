"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Package, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";

type MedicineCardProps = {
  product: Product;
};

export default function MedicineCard({ product }: MedicineCardProps) {
  if (!product) return null;

  
  const stockCount = (product as any).stock ?? 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;
  const isOutOfStock = stockCount === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full group relative"
    >
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-transparent via-[#8686AC] to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Card className="relative h-full flex flex-col overflow-hidden border-border/40 bg-background/50 backdrop-blur-md shadow-lg rounded-[22px]">
        
     
        <div className="relative h-56 w-full flex items-center justify-center p-6 bg-white overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-full h-full z-10">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
        
          <div className="absolute top-4 left-4 z-20">
             <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
               {product.category?.name || "Medicine"}
             </div>
          </div>

         
          <div className="absolute top-4 right-4 z-20">
            {isOutOfStock ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 border border-red-400 shadow-lg">
                <AlertCircle className="size-3 text-white" />
                <span className="text-[10px] font-black text-white uppercase">Sold Out</span>
              </div>
            ) : (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 backdrop-blur-md shadow-xl transition-all ${
                isLowStock 
                ? 'bg-orange-500 border-orange-200 text-white' 
                : 'bg-[#0F0E47] border-[#8686AC] text-white'
              }`}>
                <Package className={`size-3 ${isLowStock ? 'text-white' : 'text-[#8686AC]'}`} />
                <div className="flex items-center gap-1">
                   <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">Stock:</span>
                   <span className="text-xs font-black">{stockCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>

       
        <div className="flex-grow flex flex-col">
          <CardHeader className="pt-6 pb-2 px-6 space-y-1">
            <CardTitle className="text-xl font-black tracking-tight line-clamp-1 group-hover:text-[#8686AC] transition-colors">
              {product.name}
            </CardTitle>
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tighter text-[#272757] dark:text-white">
                ${product.price}
              </span>
              <span className="text-sm text-muted-foreground/40 line-through font-bold">
                ${(product.price * 1.4).toFixed(0)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <p className="text-xs text-muted-foreground/70 line-clamp-2 leading-relaxed min-h-[32px]">
              {product.description || "Premium pharmaceutical formulation for effective treatment."}
            </p>
          </CardContent>
        </div>

     
        <CardFooter className="p-6 pt-0 mt-auto">
          <Link href={`/shop/${product.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-[#8686AC]/50 hover:bg-[#8686AC]/5 text-[#272757] dark:text-white font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 group/btn shadow-inner"
            >
              View Details <Eye className="size-4 ml-3 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}