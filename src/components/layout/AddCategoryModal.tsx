"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // পোর্টাল ইম্পোর্ট
import { Plus, X, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCategory } from "@/services/medicine.service";

export default function AddCategoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createCategory({ name });
    if (res.success) {
      toast.success("Category created successfully");
      setIsOpen(false);
      setName("");
      router.refresh();
    } else {
      toast.error(res.message || "Error adding category");
    }
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* --- Trigger Button --- */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group px-8 py-3 rounded-2xl bg-[#272757] border border-[#505081]/50 text-white font-bold text-sm transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(40,40,87,0.4)] active:scale-95"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#505081] to-[#8686AC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 w-[30%] h-full bg-white/10 skew-x-[-25deg] -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
        
        <span className="relative z-10 flex items-center gap-2 group-hover:tracking-widest transition-all duration-500">
          <Plus className="w-5 h-5" /> Add Category
        </span>
      </button>

      {/* --- Modal using React Portal --- */}
      {isOpen && createPortal(
        <div className="fixed inset-0 isolate z-[99999] flex items-center justify-center p-4">
          
          
          <div 
            className="fixed inset-0 bg-[#000000]/90 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => setIsOpen(false)} 
          />
          
         
          <div className="relative z-10 bg-[#0F0E47] border border-[#505081]/30 w-full max-w-md rounded-[2.5rem] p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-300 overflow-hidden">
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8686AC]/10 blur-[50px] pointer-events-none" />

            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#272757] flex items-center justify-center border border-[#505081]/30 text-[#8686AC]">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">New Collection</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="size-10 flex items-center justify-center rounded-full text-[#8686AC] hover:bg-white/5 hover:text-white transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-left">
                <label className="block text-[10px] font-black text-[#8686AC] uppercase tracking-[0.4em] mb-3 ml-1">
                  Collection Identity
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Antibiotics"
                  className="w-full bg-[#0F0E47] border border-[#505081]/40 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#8686AC] transition-all font-bold placeholder:opacity-20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden bg-[#272757] text-white font-black py-4 rounded-2xl border border-[#505081]/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(80,80,129,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#505081] to-[#8686AC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 w-[40%] h-full bg-white/5 skew-x-[-20deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-xs tracking-[0.3em]">
                  {loading ? "Synchronizing..." : "Register Category"}
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