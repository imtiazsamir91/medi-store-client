import AddCategoryModal from "@/components/layout/AddCategoryModal";
import CategoryList from "@/components/layout/CategoryList";
import { getAllCategories } from "@/services/medicine.service";

export default async function CategoriesPage() {
  const response = await getAllCategories();
  const categories = response?.data || [];

  return (
    <div className="relative min-h-screen p-6 md:p-12 bg-transparent text-white overflow-hidden selection:bg-[#8686AC]/30">
      
    
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#505081]/20 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] bg-[#272757]/40 rounded-full blur-[110px] animate-pulse delay-700" />
      </div>

    
      <header className="relative z-10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#8686AC]">Inventory Portal</span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-[#8686AC]/50 to-transparent"></div>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic">
            Cetagory<span className="text-[#505081] not-italic tracking-normal">_</span>
          </h1>
        </div>

        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#505081] to-[#8686AC] rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
          <AddCategoryModal />
        </div>
      </header>

      
      <main className="relative z-10 animate-in fade-in zoom-in-95 duration-1000 delay-300">
        <div className="bg-[#0F0E47]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="p-4 md:p-6">
            <CategoryList initialCategories={categories} />
          </div>
        </div>
      </main>

      
      <footer className="mt-12 flex items-center gap-4 px-8 border-t border-white/5 pt-8 text-[9px] font-bold uppercase tracking-[0.5em] text-[#8686AC]/40">
        <div className="relative size-2 bg-[#8686AC] rounded-full shadow-[0_0_10px_rgba(134,134,172,0.8)] animate-pulse"></div>
        Core Indexing Active — {categories.length} Elements
      </footer>
    </div>
  );
}