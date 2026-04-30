
import { Users, ShoppingBag, DollarSign, Pill } from "lucide-react";
export const dynamic = "force-dynamic";
export default function AdminDashboard() {
  // আপাতত ডামি ডেটা, পরে আপনার API থেকে নিয়ে আসবেন
  const statsData = {
    totalUsers: 1250,
    totalSellers: 45,
    totalOrders: 3200,
    totalRevenue: 54200.50,
    totalMedicines: 850
  };

  const stats = [
    {
      label: "Total Revenue",
      value: `$${statsData.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      label: "Total Users",
      value: statsData.totalUsers,
      icon: <Users className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      label: "Total Orders",
      value: statsData.totalOrders,
      icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      label: "Medicines",
      value: statsData.totalMedicines,
      icon: <Pill className="w-6 h-6 text-rose-500" />,
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-zinc-400">Welcome to your dashboard control center.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 bg-zinc-900 border ${stat.border} rounded-2xl shadow-sm hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 text-white">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* নিচের ফাঁকা জায়গায় আপনি পরে গ্রাফ বা রিসেন্ট অর্ডার টেবিল বসাতে পারেন */}
      <div className="mt-10 p-10 border border-dashed border-zinc-800 rounded-2xl text-center">
        <p className="text-zinc-500">Charts and Detailed Analytics coming soon...</p>
      </div>
    </div>
  );
}