import MyMedicines from "@/components/modules/medicine/addMedicine/editMedicine";
import { motion } from "framer-motion"; // যদি ফাউমার মোশন ব্যবহার করেন
export const dynamic = "force-dynamic";
export default function MyMedicinesPage() {
  return (
    // লাইট ও ডার্ক মোড সাপোর্ট এবং রেসপন্সিভ প্যাডিং
    <div className="min-h-screen bg-slate-50 dark:bg-[#03030A] transition-colors duration-500">
      
      {/* মেইন কন্টেইনার - মোবাইলে px-4 এবং বড় স্ক্রিনে px-10 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        
        {/* হেডার সেকশন - মোবাইলে লেখা ছোট এবং সেন্টারে হবে, বড় স্ক্রিনে বামে */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1 text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-[#8686AC]/60">
              Inventory Control
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
              My <span className="text-blue-600 dark:text-blue-400 not-italic uppercase">Medicines</span>
            </h1>
          </div>
          
          {/* যদি ভবিষ্যতে এখানে ফিল্টার বা বাটন যোগ করতে চান */}
          <div className="h-1 w-20 bg-blue-600 rounded-full md:hidden" /> 
        </header>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="w-full">
          {/* MyMedicines কম্পোনেন্টটি এখন একটি রেসপন্সিভ বক্সের ভেতরে থাকবে */}
          <div className="bg-white dark:bg-slate-900/40 rounded-[24px] md:rounded-[32px] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
             <MyMedicines />
          </div>
        </main>

        {/* ফুটার বা স্ট্যাটাস বার */}
        <footer className="mt-10 text-center md:text-left">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-[#8686AC]/30">
            System Active // Secure Access
          </p>
        </footer>
      </div>
    </div>
  );
}