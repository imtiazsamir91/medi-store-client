import AddCategoryModal from "@/components/layout/AddCategoryModal";
import CategoryList from "@/components/layout/CategoryList";
import { getAllCategories } from "@/services/medicine.service";
export const dynamic = "force-dynamic";
export default async function CategoriesPage() {
  const response = await getAllCategories();
  const categories = response?.data || [];

  return (
    // 'bg-white text-black' (লাইট থিম) এবং 'dark:bg-[#0F0E47] dark:text-white' (ডার্ক থিম)
    <div className="relative min-h-screen bg-white dark:bg-[#0F0E47] text-black dark:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* Background Glows (ডার্ক মোডে শুধু দেখা যাবে) */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-0 dark:opacity-100">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#505081]/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 pb-32">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left w-full md:w-auto">
            {/* এখানে text-black dark:text-[#8686AC] নিশ্চিত করবে লাইট মোডে এটা কালো হবে */}
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black dark:text-[#8686AC] mb-2">
              Inventory Portal
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-black dark:text-white leading-none">
              Category<span className="text-[#505081] not-italic">_</span>
            </h1>
          </div>
          
          {/* বাটন কন্টেইনার */}
          <div className="w-full md:w-auto flex justify-start md:justify-end">
            <AddCategoryModal />
          </div>
        </header>

        {/* Main List Container */}
        <main className="w-full">
          {/* লাইট মোডে বর্ডার এবং শ্যাডো একদম কড়া করা হয়েছে */}
          <div className="w-full rounded-[2rem] md:rounded-[2.5rem] border-2 border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#272757]/20 backdrop-blur-3xl shadow-xl overflow-hidden">
            
            {/* CRITICAL: এখানে 'text-black dark:text-white' দেওয়া হয়েছে। 
               যদি আপনার CategoryList এর ভেতর 'text-white' হার্ডকোড করা থাকে, তবে ওটা চেঞ্জ করতে হবে।
            */}
            <div className="p-4 md:p-10 text-black dark:text-white">
              <CategoryList initialCategories={categories} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 flex flex-col md:flex-row items-center gap-6 px-4 text-[10px] font-black uppercase tracking-[0.5em] text-black dark:text-[#8686AC]/40">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-black dark:bg-[#8686AC] rounded-full"></div>
            <span>System Online // Core Index</span>
          </div>
          <span className="hidden md:inline opacity-20">|</span>
          <span>{categories.length} Elements Logged</span>
        </footer>
      </div>
    </div>
  );
}