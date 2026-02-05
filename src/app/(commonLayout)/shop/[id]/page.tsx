import { medicineService } from "@/services/medicine.service";
import { notFound } from "next/navigation";
import { 
  BadgeCheck, Package, Store, Mail, Tag, ShoppingCart, Clock, ArrowLeft, Star 
} from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ShopById({ params }: Props) {
  const { id } = await params;
  const res = await medicineService.getProductById(id);

  if (!res.data) return notFound();

  const product = res.data;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-50/50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Back Button */}
      <Link href="/shop" className="flex items-center text-sm text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Product Image/Visual */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-3xl p-12 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-center aspect-square transition-all">
             <div className="text-center">
                <div className="w-32 h-32 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                   <Package size={64} />
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category?.name || "Medicine"}
                </span>
             </div>
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="lg:col-span-7 space-y-8">
          
          <section>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-zinc-100 mb-2 capitalize leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 dark:text-zinc-500 text-sm">
               <span className="flex items-center gap-1">
                 <Tag className="w-4 h-4" /> ID: {product.id.slice(0, 8)}...
               </span>
               <span className="flex items-center gap-1">
                 <Clock className="w-4 h-4" /> Updated: {new Date(product.updatedAt).toLocaleDateString()}
               </span>
            </div>
          </section>

          {/* Pricing & Stock Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-all">
            <div>
              <p className="text-gray-400 dark:text-zinc-500 text-sm">Price</p>
              <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400">${product.price}</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-400 dark:text-zinc-500 text-sm mb-1">Stock Status</p>
              <span className={`px-4 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-2 ${product.stock > 0 ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                <BadgeCheck className="w-4 h-4" /> {product.stock} Units
              </span>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-200">Product Description</h3>
            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed bg-white dark:bg-zinc-900/50 p-5 rounded-2xl border border-gray-50 dark:border-zinc-800">
              {product.description || "No detailed description available for this medicine."}
            </p>
          </section>

          {/* Seller Information Card */}
          <section className="bg-zinc-900 dark:bg-blue-600 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden transition-all">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-blue-400 dark:text-blue-100">
                   <Store className="w-5 h-5" />
                   <span className="text-xs font-bold uppercase tracking-widest">Authorized Seller</span>
                </div>
                <h4 className="text-xl font-bold mb-1">{product.seller?.name}</h4>
                <p className="flex items-center gap-2 text-zinc-400 dark:text-blue-50 text-sm">
                   <Mail className="w-4 h-4" /> {product.seller?.email}
                </p>
             </div>
             <Store className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
          </section>

          {/* Buy Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <ShoppingCart className="w-6 h-6" /> Add to Prescription Cart
          </button>

          {/* Reviews Section */}
          <section className="pt-10 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Customer Reviews</h3>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
                {product.reviews?.length || 0} Reviews
              </span>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="grid gap-4">
                {product.reviews.map((rev: any, index: number) => (
                  <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase">
                        {rev.userName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-zinc-200 text-sm">{rev.userName || "Verified User"}</h4>
                        <div className="flex text-yellow-500">
                           {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-zinc-900/40 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800">
                <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-zinc-200">No reviews yet</h4>
                <p className="text-gray-500 dark:text-zinc-500 text-sm max-w-xs mx-auto mt-1">
                  Be the first one to share your experience with this medicine!
                </p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}