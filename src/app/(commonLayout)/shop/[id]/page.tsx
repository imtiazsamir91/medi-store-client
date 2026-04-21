"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/services/medicine.service";
import { notFound } from "next/navigation";
import { 
  Package, Store, ArrowLeft, Star, Users, Zap 
} from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/layout/AddToCartButton";
import ReviewForm from "@/components/layout/ReviewForm";
import { motion } from "framer-motion";

export default function ShopById({ params }: { params: any }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { id } = await params;
      const res = await getProductById(id);
      if (res.data) setProduct(res.data);
      setLoading(false);
    }
    fetchData();
  }, [params]);

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-[#0F0E47] bg-gray-50 text-[#8686AC] animate-pulse uppercase tracking-widest text-xs">Initializing Sync...</div>;
  if (!product) return notFound();

  return (
   
    <main className="relative min-h-screen transition-colors duration-500 bg-white dark:bg-[#0F0E47] text-gray-600 dark:text-[#8686AC] overflow-x-hidden p-4 md:p-10">
      
     
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20 mix-blend-multiply dark:mix-blend-lighten transition-all duration-700"
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png'), url('https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000')`, 
            backgroundSize: 'auto, cover',
            backgroundPosition: 'center',
          }}
        />
      
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90 dark:from-[#0F0E47]/90 dark:via-transparent dark:to-[#0F0E47]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
       
        <Link href="/shop" className="group inline-flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest hover:text-blue-600 dark:hover:text-white transition-all">
          <ArrowLeft className="size-3 group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>

       
        <div className="bg-gray-50/50 dark:bg-[#161555]/60 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[40px] overflow-hidden shadow-2xl mb-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            
            <div className="p-8 md:p-12 flex flex-col justify-center items-center bg-gray-100/30 dark:bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/5">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative">
                <div className="absolute inset-0 bg-blue-400/10 dark:bg-[#8686AC]/20 blur-[80px]" />
                <div className="relative size-64 md:size-80 bg-white dark:bg-[#0F0E47] rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-inner">
                  <Package size={100} strokeWidth={0.5} className="text-gray-300 dark:text-white/10" />
                </div>
              </motion.div>
            </div>

            
            <div className="p-8 md:p-12 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-[#505081] font-black text-[9px] tracking-[0.4em] uppercase">
                  <Zap size={12} fill="currentColor" /> Verified Asset
                </div>
                <h1 className="text-5xl font-light text-gray-900 dark:text-white tracking-tighter capitalize">{product.name}</h1>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">USD</span>
              </div>

              <p className="text-xs leading-relaxed opacity-70 italic dark:opacity-60">{product.description || "Medical grade equipment for specialized use cases."}</p>

              <div className="pt-6">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1 bg-gray-50/50 dark:bg-white/[0.03] backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[30px] p-6 h-fit">
            <Store className="mb-4 text-blue-600 dark:text-[#505081]" size={24} />
            <h4 className="text-gray-900 dark:text-white font-bold text-sm uppercase italic">{product.seller?.name}</h4>
            <p className="text-[10px] opacity-50 mb-6">{product.seller?.email}</p>
            <Link href={`mailto:${product.seller?.email}`} className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-[#8686AC] hover:underline flex items-center gap-2">
              Contact Dealer <ArrowLeft className="size-3 rotate-180" />
            </Link>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50/50 dark:bg-white/[0.03] backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[30px] p-8">
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-white/5 pb-4">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg uppercase italic flex items-center gap-2">
                   <Users size={18} /> Feedback Log
                </h3>
                <span className="text-[10px] font-bold bg-gray-200 dark:bg-[#505081]/30 text-gray-600 dark:text-white px-3 py-1 rounded-full">
                  {product.reviews?.length || 0} Entries
                </span>
              </div>

              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {product.reviews?.map((rev: any, i: number) => (
                  <div key={i} className="border-b border-gray-100 dark:border-white/5 last:border-0 pb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-gray-800 dark:text-white/80 uppercase">{rev.user?.name || "Client_ID"}</span>
                      <div className="flex gap-0.5 text-yellow-500 dark:text-[#8686AC]">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={8} fill={idx < (rev.rating || 5) ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs italic text-gray-600 dark:text-white/60">"{rev.comment}"</p>
                  </div>
                ))}
                {(!product.reviews || product.reviews.length === 0) && (
                   <p className="text-center text-xs opacity-40 py-10">No public records found.</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50/50 dark:bg-[#0F0E47]/60 border border-gray-200 dark:border-white/10 rounded-[30px] p-8 shadow-inner">
               <ReviewForm medicineId={product.id} userId={"VuvssZJgqbYTIjW3H3752jgoVpPRH4TW"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}