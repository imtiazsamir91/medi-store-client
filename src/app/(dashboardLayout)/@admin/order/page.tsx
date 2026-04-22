import { getAllAdminOrders } from "@/services/medicine.service";
import OrderActionSelect from "@/components/layout/OrderActionSelect";
import Link from "next/link";

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = 'ALL' } = await searchParams;
  const response = await getAllAdminOrders(status);
  const orders = response?.data || [];

  return (
    <div className="relative min-h-screen p-4 md:p-10 bg-transparent text-white overflow-hidden">
      
      {/* Background Subtle Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#505081]/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#272757]/20 rounded-full blur-[70px] md:blur-[100px]" />
      </div>

      {/* Header */}
      <header className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-[1px] w-6 bg-[#8686AC]"></span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8686AC]">Admin Panel</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-b from-white to-[#8686AC] bg-clip-text text-transparent tracking-tighter">
          Orders Management
        </h1>
      </header>

      {/* Modern Horizontal Scrollable Filters */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-4 no-scrollbar scroll-smooth">
        {['ALL', 'PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((s) => {
          const isActive = status === s;
          return (
            <Link
              key={s}
              href={s === 'ALL' ? '/order' : `/order?status=${s}`}
              className={`shrink-0 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all border ${
                isActive 
                ? 'bg-[#8686AC] border-[#8686AC] text-[#0F0E47] shadow-lg' 
                : 'bg-white/5 border-white/10 text-[#8686AC] hover:bg-white/10'
              }`}
            >
              {s}
            </Link>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-[#0F0E47]/40 backdrop-blur-3xl overflow-hidden">
        
        {/* DESKTOP TABLE VIEW (Visible on md and up) */}
        <div className="hidden md:block">
          <table className="w-full text-left border-separate border-spacing-y-2 px-4">
            <thead>
              <tr className="text-[#8686AC]/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Identity ID</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Client</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-right">Status Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {orders.map((order: any) => (
                <tr key={order.id} className="group hover:bg-white/[0.04] transition-all">
                  <td className="px-8 py-7 font-mono text-sm font-bold text-white tracking-widest">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-[#505081]/30 flex items-center justify-center text-xs font-black border border-white/10">
                        {order.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-white">{order.user?.name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <OrderActionSelect orderId={order.id} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW (Visible on small screens) */}
        <div className="md:hidden flex flex-col divide-y divide-white/5">
          {orders.map((order: any) => (
            <div key={order.id} className="p-6 space-y-5 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#8686AC] uppercase tracking-widest opacity-60">Order ID</p>
                  <p className="font-mono text-base font-black text-white tracking-widest">
                    #{order.id.slice(-6).toUpperCase()}
                  </p>
                </div>
                {/* Status Dropdown inside the card */}
                <div className="scale-90 origin-right">
                  <OrderActionSelect orderId={order.id} currentStatus={order.status} />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                <div className="size-10 shrink-0 rounded-xl bg-gradient-to-br from-[#272757] to-[#505081] flex items-center justify-center text-sm font-black border border-white/10 shadow-lg">
                  {order.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-[#8686AC] uppercase tracking-tighter">Customer Name</p>
                  <p className="font-bold text-white text-base truncate">{order.user?.name}</p>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="p-20 text-center text-[#8686AC] text-[10px] font-bold uppercase tracking-[0.3em]">
              Empty Registry
            </div>
          )}
        </div>
      </div>
    </div>
  );
}