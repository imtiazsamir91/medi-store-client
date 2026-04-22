"use client";

import { getSellerMedicines, deleteMedicine, updateMedicine } from "@/services/medicine.service";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Package, DollarSign, Box, X } from "lucide-react";

type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
};

export default function MyMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await getSellerMedicines();
      if (res.data) setMedicines(res.data);
      else if (res.error) {
        toast.error(res.error.message || "Failed to load inventory");
        setMedicines([]);
      }
    } catch (err: any) {
      toast.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;
    try {
      const res = await deleteMedicine(id);
      if (res.success) {
        toast.success("Medicine deleted successfully");
        setMedicines((prev) => prev.filter((med) => med.id !== id));
      } else {
        toast.error(res.message || "Delete failed");
      }
    } catch (err) {
      toast.error("An error occurred while deleting.");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
    };

    try {
      const res = await updateMedicine(id, updateData);
      if (res.success) {
        toast.success("Medicine updated successfully");
        setMedicines((prev) =>
          prev.map((med) => (med.id === id ? { ...med, ...updateData } : med))
        );
        setEditingId(null);
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="w-full relative">
      <Toaster position="top-center" richColors />

      {!medicines.length ? (
        <div className="text-center p-12 bg-white/50 dark:bg-white/5 rounded-[32px] border border-dashed border-slate-200">
          <p className="text-slate-500 italic">No assets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {medicines.map((med) => (
            <motion.div 
              key={med.id} 
              className="group relative bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-[28px] md:rounded-[32px] shadow-sm"
            >
              <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2 truncate">
                {med.name}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10">{med.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Price</span>
                  <p className="font-black dark:text-white">৳{med.price}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Stock</span>
                  <p className="font-black dark:text-white">{med.stock}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingId(med.id)} 
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-xs uppercase"
                >
                  <Edit3 size={14} /> Update
                </button>
                <button 
                  onClick={() => handleDelete(med.id)} 
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* মোডাল সেকশন - যা এখন সবকিছুর উপরে থাকবে */}
              <AnimatePresence>
                {editingId === med.id && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* ওভারলে */}
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      onClick={() => setEditingId(null)} 
                      className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" 
                    />
                    
                    {/* মোডাল বডি */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                      className="relative w-full max-w-lg bg-white dark:bg-[#0F0F1A] rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                      
                      {/* মোডাল হেডার - ফিক্সড */}
                      <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-[#0F0F1A] z-10">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter flex items-center gap-2">
                          <Package className="text-blue-500" /> Edit Medicine
                        </h2>
                        <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full">
                          <X size={20} className="text-slate-400" />
                        </button>
                      </div>

                      {/* ফর্ম বডি - স্ক্রলযোগ্য */}
                      <form onSubmit={(e) => handleUpdateSubmit(e, med.id)} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Medicine Name</label>
                          <input name="name" defaultValue={med.name} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" required />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description</label>
                          <textarea name="description" defaultValue={med.description} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl text-sm min-h-[100px] dark:text-white outline-none" required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Price (BDT)</label>
                            <input name="price" type="number" step="0.01" defaultValue={med.price} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl font-black text-blue-600 outline-none" required />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Stock Units</label>
                            <input name="stock" type="number" defaultValue={med.stock} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl font-black dark:text-white outline-none" required />
                          </div>
                        </div>
                        
                        {/* বাটনটি এখন ফর্মের ভেতরে থাকবে যা স্ক্রল করলে দেখা যাবে */}
                        <div className="pt-4">
                          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-all">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}