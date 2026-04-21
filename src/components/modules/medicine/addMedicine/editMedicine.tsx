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
    
    if (res.data) {
      setMedicines(res.data);
    } 
    
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
    if (!confirm("Are you sure you want to delete this medicine? This action cannot be undone.")) return;
    
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
      toast.error("Update failed due to network error");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#03030F] relative overflow-hidden p-6 md:p-12">
      <Toaster position="top-right" richColors />

      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
        <motion.div animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1.2, 1, 1.2] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Inventory <span className="text-blue-500 font-light italic">Console</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Manage and monitor your pharmaceutical assets.</p>
        </header>

        {!medicines.length ? (
          <div className="text-center p-20 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-[32px] border border-dashed border-slate-200 dark:border-white/10">
             <p className="text-slate-500 italic">No assets found in the current cluster.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicines.map((med) => (
              <motion.div key={med.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} className="group relative bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/50 dark:border-white/5 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full" />
                
                <h3 className="font-black text-xl text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-500 transition-colors">
                  {med.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6">
                  {med.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      <DollarSign size={12} className="text-blue-500" /> Price
                    </span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">৳{med.price}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      <Box size={12} className="text-blue-500" /> Stock
                    </span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{med.stock}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setEditingId(med.id)} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                    <Edit3 size={14} /> Update
                  </button>
                  <button onClick={() => handleDelete(med.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Edit Modal */}
                <AnimatePresence>
                  {editingId === med.id && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingId(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
                      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white dark:bg-[#0F0F1A] p-8 md:p-10 rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-500" />
                        <div className="flex justify-between items-center mb-8">
                          <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-3">
                            <Package className="text-blue-500" /> Edit Medicine
                          </h2>
                          <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <X size={20} />
                          </button>
                        </div>

                        <form onSubmit={(e) => handleUpdateSubmit(e, med.id)} className="space-y-5">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Name</label>
                            <input name="name" defaultValue={med.name} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-bold text-slate-900 dark:text-white" required />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Clinical Description</label>
                            <textarea name="description" defaultValue={med.description} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-900 dark:text-white min-h-[100px] resize-none" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price (BDT)</label>
                              <input name="price" type="number" step="0.01" defaultValue={med.price} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-black text-blue-600" required />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stock Units</label>
                              <input name="stock" type="number" defaultValue={med.stock} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-black text-slate-900 dark:text-white" required />
                            </div>
                          </div>
                          
                          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 mt-6 transition-all active:scale-95">
                            Confirm Changes
                          </button>
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
    </div>
  );
}