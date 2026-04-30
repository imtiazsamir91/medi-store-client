import { addMedicine } from "@/components/modules/medicine/addMedicine/addMedicine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { PackagePlus, ImageIcon, DollarSign, Layers, ClipboardList, Info, Sparkles, ChevronDown } from "lucide-react";
export const dynamic = "force-dynamic";
const API_URL = env.API_URL;
type Category = { id: string; name: string };

export default async function AddMedicineCard() {
  const res = await fetch(`${API_URL}/api/medicine/category`, { cache: "no-store" });
  const json = await res.json();
  const categories: Category[] = Array.isArray(json) ? json : json.data ?? [];

  return (
    <div className="relative min-h-screen flex justify-center items-center p-4 md:p-8 lg:p-12 bg-[#F9FAFB] dark:bg-[#03030A] overflow-x-hidden">
      
      {/* Decorative Glows - মোবাইলে সাইজ ছোট করা হয়েছে */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-purple-500/10 blur-[80px] md:blur-[120px] rounded-full animate-bounce [animation-duration:10s]" />
      </div>

      <Card className="relative z-10 w-full max-w-2xl border-none bg-white/90 dark:bg-slate-900/50 backdrop-blur-3xl shadow-2xl rounded-[24px] md:rounded-[32px] overflow-hidden">
        
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-500" />

        <CardHeader className="pt-8 md:pt-10 pb-6 px-6 md:px-12 space-y-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-sm">
              <PackagePlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              Add New <span className="text-blue-600 dark:text-blue-400 font-light italic capitalize">Medicine</span>
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 font-medium text-sm md:text-base">
            Register new pharmaceutical assets to the central inventory system.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 md:px-12 pb-8">
          <form id="medicine-form" action={addMedicine} className="space-y-6 md:space-y-8">
            <FieldGroup className="space-y-5 md:space-y-6">
              
              {/* Medicine Details */}
              <div className="grid grid-cols-1 gap-5 md:gap-6">
                <CustomField 
                  label="Medicine Name" 
                  icon={<ClipboardList className="w-4 h-4" />}
                  name="title" 
                  placeholder="e.g. Napa Extra" 
                  required 
                />

                <CustomField 
                  label="Description" 
                  icon={<Info className="w-4 h-4" />}
                  name="description" 
                  placeholder="Usage instructions..." 
                  required 
                />
              </div>

              {/* Price & Stock - মোবাইলে এক কলাম, বড় স্ক্রিনে দুই কলাম */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <CustomField 
                  label="Price (BDT)" 
                  icon={<DollarSign className="w-4 h-4" />}
                  name="price" 
                  type="number"
                  placeholder="0.00" 
                  required 
                  className="font-bold text-blue-600"
                />

                <CustomField 
                  label="Stock Quantity" 
                  icon={<Layers className="w-4 h-4" />}
                  name="stock" 
                  type="number"
                  placeholder="0" 
                  required 
                  className="font-bold"
                />
              </div>

              <CustomField 
                label="Image URL" 
                icon={<ImageIcon className="w-4 h-4" />}
                name="image" 
                type="url"
                placeholder="https://image-link.jpg" 
                required 
              />

              {/* Category Select */}
              <Field className="space-y-2.5">
                <FieldLabel className="flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <Sparkles className="w-4 h-4 text-blue-500" /> Category protocol
                </FieldLabel>
                <div className="relative group">
                  <select 
                    name="categoryId" 
                    required 
                    className="flex h-12 md:h-14 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer appearance-none shadow-sm group-hover:border-blue-500/50"
                  >
                    <option value="" disabled selected>Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="p-6 md:p-10 bg-slate-50/50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
          <Button 
            form="medicine-form" 
            type="submit" 
            className="w-full h-14 md:h-16 rounded-[18px] md:rounded-[20px] text-base md:text-lg font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl hover:bg-blue-600 dark:hover:bg-blue-100 active:scale-95 transition-all duration-300"
          >
            Save to Inventory
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function CustomField({ label, icon, className, ...props }: any) {
  return (
    <Field className="space-y-2.5">
      <FieldLabel className="flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        <span className="text-blue-500">{icon}</span> {label}
      </FieldLabel>
      <Input 
        {...props}
        className={`h-12 md:h-14 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500/20 transition-all ${className}`}
      />
    </Field>
  );
}