"use client";
import { deleteCategory } from "@/services/medicine.service";
import { Trash2, Layers, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import EditCategoryModal from "./EditCategoryModal";

export default function CategoryList({ initialCategories }: { initialCategories: any[] }) {
  
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    const res = await deleteCategory(id);
    if (res.success) {
      toast.success("Category deleted!");
    } else {
      toast.error(res.message || "Failed to delete");
    }
  };

  return (
    <div className="w-full">
      <table className="w-full text-left border-separate border-spacing-y-2.5 px-2">
        <thead>
          <tr className="text-[#8686AC]/40 uppercase text-[9px] font-black tracking-[0.4em]">
            <th className="px-6 py-2">Entity Name</th>
            <th className="px-6 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialCategories.map((category, index) => (
            <tr 
              key={category.id} 
              className="group transition-all duration-300 animate-in fade-in slide-in-from-right-4"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <td className="px-6 py-3 bg-white/[0.03] border-y border-l border-white/10 group-hover:border-[#8686AC]/30 rounded-l-2xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-[#272757]/40 border border-white/5 flex items-center justify-center group-hover:bg-[#505081]/30 transition-all duration-300">
                    <Layers className="w-4 h-4 text-[#8686AC] group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-white group-hover:text-[#8686AC] transition-colors tracking-tight">
                      {category.name}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-[#8686AC]/40 uppercase tracking-tighter">
                      <ChevronRight className="w-2.5 h-2.5" />
                      ID: {category.id.slice(-6).toUpperCase()}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-3 bg-white/[0.03] border-y border-r border-white/10 group-hover:border-[#8686AC]/30 rounded-r-2xl text-right transition-all duration-300">
                <div className="flex justify-end items-center gap-2">
                
                  <EditCategoryModal category={category} />
                  
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="p-2.5 rounded-lg bg-[#0F0E47] border border-white/5 hover:border-red-500/50 text-[#8686AC] hover:text-white hover:bg-red-500/20 transition-all duration-300 group/del active:scale-90"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}