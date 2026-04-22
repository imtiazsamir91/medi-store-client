import { Hero47 } from "@/components/layout/hero47";
import MedicineCard from "@/components/modules/homepage/medicineCard";
import { getMedicinePost } from "@/services/medicine.service";
import { Product } from "@/types";
import Link from "next/link"; // লিঙ্ক ইমপোর্ট করা হয়েছে
import { ArrowRight } from "lucide-react"; // আইকন
import AboutSection from "./about/page";
import EmailNewsletter from "@/components/layout/emailCart";

type MedicineResponse = {
  data: Product[] | null;
  error: { message: string } | null;
};

export default async function Home() {
  const res: MedicineResponse = await getMedicinePost();
  
  // প্রথম ৮টি আইটেম নেওয়া হচ্ছে
  const products: Product[] = (res.data || []).slice(0, 8);

  if (res.error) {
    console.error("API Error:", res.error.message);
  }

  return (
    <main className="w-full">
      
      
      <section className="w-full overflow-hidden">
        <Hero47 />
      </section>

      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col gap-10">
          <div className="space-y-2 border-l-4 border-[#8686AC] pl-4">
             <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-foreground uppercase italic">
               Top Medicines
             </h2>
             <p className="text-muted-foreground">Find the best healthcare products here.</p>
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed rounded-3xl">
               <p className="text-muted-foreground text-lg italic">No products found at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <MedicineCard key={product.id} product={product} />
                ))}
              </div>

             
              {(res.data?.length ?? 0) > 8 && (
                <div className="flex justify-center mt-12">
                  <Link href="/shop">
                    <button className="group relative px-10 py-4 bg-gradient-to-r from-[#272757] via-[#505081] to-[#8686AC] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-[0_10px_40px_rgba(39,39,87,0.3)] hover:shadow-[0_15px_50px_rgba(134,134,172,0.4)] transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 overflow-hidden">
                     
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      View All Products 
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        <AboutSection/>
      </div>
      <div><EmailNewsletter/></div>
    </main>
  );
}