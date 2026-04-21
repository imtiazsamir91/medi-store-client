import { getAllAdminOrders } from "@/services/medicine.service";
import OrderActionSelect from "@/components/layout/OrderActionSelect";
import Link from "next/link";

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = 'ALL' } = await searchParams;
  const response = await getAllAdminOrders(status);
  const orders = response?.data || [];

  return (
    <div className="relative min-h-screen p-6 md:p-10 bg-transparent text-white overflow-hidden">
      
     
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
       
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#505081]/20 rounded-full blur-[120px] animate-[pulse_8s_infinite_alternate]" />
        
        
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#272757]/30 rounded-full blur-[100px] animate-[bounce_15s_infinite_alternate]" />
        
       
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8686AC]/10 to-transparent -rotate-12 animate-[pulse_5s_infinite]" />
      </div>
    

     
      <header className="relative mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-px w-8 bg-[#8686AC] animate-grow"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8686AC]">Operations Center</span>
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-b from-white to-[#8686AC] bg-clip-text text-transparent tracking-tighter">
          Order Management
        </h1>
      </header>

    
      <div className="flex flex-wrap gap-3 mb-10 animate-in fade-in slide-in-from-left duration-700">
        {['ALL', 'PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((s) => {
          const isActive = status === s;
          return (
            <Link
              key={s}
              href={s === 'ALL' ? '/order' : `/order?status=${s}`}
              className={`relative px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all duration-500 border overflow-hidden group ${
                isActive 
                ? 'border-[#8686AC] text-white shadow-[0_0_25px_rgba(134,134,172,0.3)]' 
                : 'border-white/5 bg-white/5 text-[#8686AC] hover:border-white/20 hover:scale-105'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#272757] via-[#505081] to-[#272757] -z-10 animate-[gradient_3s_infinite_linear] bg-[length:200%_auto]" />
              )}
              {s}
            </Link>
          );
        })}
      </div>

      
      <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0F0E47]/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
        
        <div className="overflow-x-auto px-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[#8686AC]/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Identity ID</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Client</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {orders.map((order: any, index: number) => (
                <tr 
                  key={order.id} 
                  className="group hover:bg-white/[0.04] transition-all duration-500 ease-out"
                >
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-3">
                       <div className="size-2 rounded-full bg-[#8686AC] animate-pulse shadow-[0_0_12px_#8686AC]" />
                       <span className="font-mono text-sm font-bold text-white tracking-widest opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                         #{order.id.slice(-6).toUpperCase()}
                       </span>
                    </div>
                  </td>

                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className="relative size-10 rounded-full bg-gradient-to-br from-[#272757] to-[#505081] flex items-center justify-center text-xs font-black border border-white/10 group-hover:rotate-[360deg] transition-transform duration-700">
                        {order.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-white tracking-tight">{order.user?.name}</p>
                    </div>
                  </td>

                  <td className="px-8 py-7 text-right">
                    <div className="inline-block group-hover:scale-110 transition-transform duration-300">
                       <OrderActionSelect orderId={order.id} currentStatus={order.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}