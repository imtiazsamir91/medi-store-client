import { ShoppingBag, DollarSign, Clock, CheckCircle } from "lucide-react";

export default function SellerStats({ orders = [] }: { orders: any[] }) {
 
  const totalOrders = orders.length;

 
  const totalRevenue = orders
    .filter((order) => order.status !== "CANCELLED") 
    .reduce((acc, order) => acc + (Number(order.total) || 0), 0);

  
  const pendingOrders = orders.filter(
    (order) => order.status === "PLACED" || order.status === "PROCESSING"
  ).length;


  const completedOrders = orders.filter(
    (order) => order.status === "SHIPPED" || order.status === "DELIVERED"
  ).length;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`, 
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-100 dark:bg-amber-900/20",
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}