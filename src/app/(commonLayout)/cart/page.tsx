"use client";
import { useCart } from "@/providers/CartProvider";
import { Trash2, Plus, Minus, Loader2, ShoppingBag, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { createOrder } from "@/services/medicine.service";
//import { createOrder } from "@/services/medicine.service";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrderConfirm = async () => {
    if (!address.trim()) return toast.error("Delivery address required for sync");
    setIsSubmitting(true);

    const orderPayload = {
      shippingAddress: address,
      items: cart.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await createOrder(orderPayload);
      if (res.success) {
        toast.success("Order sequence initiated successfully!");
        clearCart();
        router.push("/");
      } else {
        toast.error(res.message || "Protocol failure: Order rejected");
      }
    } catch (error) {
      toast.error("Network synchronization error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#05071a] flex flex-col items-center justify-center p-6 text-center transition-colors duration-500">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-100 dark:bg-white/5 backdrop-blur-3xl p-12 rounded-[50px] border border-gray-200 dark:border-white/10 shadow-2xl space-y-8 max-w-md w-full"
        >
          <div className="size-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-12">
            <ShoppingBag className="text-white size-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Cart Empty</h2>
          <p className="text-gray-500 dark:text-white/40 text-sm font-medium italic">No assets detected in synchronization.</p>
          <button 
            onClick={() => router.push("/myorder")}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all"
          >
           My Order History
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#05071a] text-gray-900 dark:text-[#8686AC] overflow-hidden transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-10 pt-40 pb-20">
        
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 dark:text-indigo-500 mb-2 block">System_Sync_v4</span>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white tracking-tighter">Review Inventory</h1>
          </div>
          <button 
            onClick={() => router.push("/myorder")} 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white dark:opacity-50 hover:opacity-100 transition-all border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full bg-white/50 dark:bg-white/5"
          >
             <LayoutGrid size={14}/> Order History
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Item List Section --- */}
          <div className="lg:col-span-7 space-y-5">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id} 
                  className="group flex items-center justify-between p-6 rounded-[35px] bg-gray-50 dark:bg-white/[0.03] backdrop-blur-2xl border border-gray-100 dark:border-white/10 hover:border-indigo-500/40 transition-all shadow-xl dark:shadow-2xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="size-16 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <ShoppingBag className="text-indigo-600 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" size={26}/>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tighter text-xl">{item.name}</h4>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-500 tracking-widest uppercase mt-1">
                        ${item.price.toFixed(2)} <span className="text-[10px] opacity-40 dark:opacity-30 ml-1">/ unit</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="flex items-center bg-white dark:bg-black/40 rounded-2xl p-1 border border-gray-200 dark:border-white/5">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="size-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all text-gray-900 dark:text-white"><Minus size={14}/></button>
                      <span className="px-4 font-black text-gray-900 dark:text-white text-sm min-w-[35px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="size-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all text-gray-900 dark:text-white"><Plus size={14}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={20}/>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* --- Order Summary Card --- */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32 p-10 rounded-[50px] bg-gray-50 dark:bg-white/[0.02] backdrop-blur-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-colors duration-500"
            >
              <div className="flex justify-between items-center mb-10 border-b border-gray-200 dark:border-white/5 pb-8">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Summary</h3>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  {cart.length} Units Listed
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-end">
                   <span className="text-lg font-black uppercase tracking-tighter text-gray-900 dark:text-white">Total Cost</span>
                   <span className="text-4xl font-black text-indigo-600 dark:text-indigo-500 tracking-tighter">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-2">Dispatch Destination</label>
                <textarea 
                  className="w-full p-6 rounded-[30px] bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 focus:border-indigo-500/50 outline-none text-sm font-medium transition-all min-h-[150px] resize-none text-gray-900 dark:text-white"
                  placeholder="Enter shipping coordinate..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="mt-10 space-y-6">
                <button 
                  disabled={isSubmitting}
                  onClick={handleOrderConfirm}
                  className="w-full relative group h-20 rounded-[30px] bg-indigo-600 overflow-hidden transition-all active:scale-95 shadow-2xl shadow-indigo-600/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-4 text-white font-black uppercase text-xs tracking-[0.4em]">
                    {isSubmitting ? <Loader2 className="animate-spin" size={24}/> : <><ArrowRight size={20}/> Initiate Order</>}
                  </span>
                </button>
                <p className="text-[9px] text-center font-black uppercase tracking-[0.5em] text-gray-400 dark:text-white dark:opacity-20">Protocol Authorization Required</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <footer className="mt-20 text-center opacity-10 text-[9px] font-black uppercase tracking-[2em] pb-10">
        MediStore Network Sync
      </footer>
    </main>
  );
}