"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pill, Package, Hash } from "lucide-react";

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#08072A]/90 backdrop-blur-xl"
          />

          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0F0E47] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
           
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent via-blue-500/5 to-transparent">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-blue-500/20">
                    <Package size={16} className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">
                    Order_Manifest
                  </h2>
                </div>
                <p className="text-[10px] font-bold text-[#8686AC] tracking-[0.2em] flex items-center gap-1">
                  <Hash size={10} /> {order.id.toUpperCase()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors border border-white/5"
              >
                <X size={20} className="dark:text-[#8686AC]" />
              </button>
            </div>

      
            <div className="p-8">
              <p className="text-[9px] font-black text-[#8686AC] uppercase tracking-[0.3em] mb-4">
                Purchased_Items_Stream
              </p>
              
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {order.items?.map((item: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-[#8686AC]/5 border border-white/5 hover:border-blue-500/30 transition-all"
                  >
                    <div className="size-14 rounded-xl bg-[#272757] flex items-center justify-center overflow-hidden border border-white/5 group-hover:scale-105 transition-transform">
                      {item.medicine?.image ? (
                        <img src={item.medicine.image} alt="med" className="size-full object-cover" />
                      ) : (
                        <Pill size={24} className="text-[#8686AC]" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-black dark:text-white uppercase tracking-tight">
                        {item.medicine?.name || "Unknown_Medicine"}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                          QTY: {item.quantity}
                        </span>
                        <span className="text-[10px] font-medium text-[#8686AC]">
                          Unit_Price: ${item.price}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black dark:text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                <div>
                   <p className="text-[9px] font-black text-[#8686AC] uppercase tracking-widest mb-1">Shipping_Address</p>
                   <p className="text-[11px] font-medium dark:text-white/60 max-w-[200px] leading-tight">
                     {order.shippingAddress || "N/A"}
                   </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-[#8686AC] uppercase tracking-widest">Total_Settlement</p>
                  <p className="text-5xl font-black dark:text-white tracking-tighter">
                    ${order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}