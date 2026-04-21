"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // পোর্টাল ইম্পোর্ট
import { Edit3, X, Save, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateCategory } from "@/services/medicine.service";

export default function EditCategoryModal({ category }: { category: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ক্লায়েন্ট সাইড রেন্ডারিং নিশ্চিত করতে
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ক্লায়েন্ট সাইড মাউন্ট চেক
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateCategory(category.id, { name });
    if (res.success) {
      toast.success("Category updated successfully");
      setIsOpen(false);
      router.refresh();
    } else {
      toast.error(res.message || "Error updating category");
    }
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <>
      
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2.5 rounded-xl bg-[#272757]/40 border border-[#505081]/30 text-[#8686AC] hover:text-white hover:bg-[#505081] transition-all duration-300 shadow-sm active:scale-95"
      >
        <Edit3 className="w-4 h-4" />
      </button>

    
      {isOpen && createPortal(
        <div className="fixed inset-0 isolate z-[999999] flex items-center justify-center p-4">
         
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => setIsOpen(false)} 
          />
          
          
          <div className="relative w-full max-w-md bg-[#0F0E47] border border-[#505081]/50 rounded-[2.5rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,1)] animate-in zoom-in-95 fade-in duration-300 text-left">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-[#272757] flex items-center justify-center border border-[#505081]/30 text-[#8686AC]">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Update Record</h2>
                  <p className="text-[9px] text-[#8686AC]/40 font-bold uppercase tracking-[0.4em]">Inventory Sync</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="size-10 flex items-center justify-center rounded-full bg-white/5 text-[#8686AC] hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-[#8686AC] uppercase tracking-[0.4em] ml-1">
                  Collection Label
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0F0E47] border border-[#505081]/40 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#8686AC] transition-all font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden bg-[#272757] text-white font-black py-4 rounded-2xl border border-[#505081]/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#505081] to-[#8686AC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.3em]">
                  {loading ? "Synchronizing..." : "Confirm Update"}
                </span>
              </button>
            </form>
          </div>
        </div>,
        document.body 
      )}
    </>
  );
}