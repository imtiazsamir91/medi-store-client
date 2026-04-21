
import SellerStats from "@/components/layout/SellerStats";
import { getSellerOrders } from "@/services/medicine.service";

export default async function SellerOrdersPage() {
  const res = await getSellerOrders();
  const orders = res.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Seller Order Management</h1>
        <p className="text-gray-500">Manage and track orders for your medicines.</p>
      </div>

    
      <SellerStats orders={orders} />

  
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
           
        </table>
      </div>
    </div>
  );
}