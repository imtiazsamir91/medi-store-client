"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "@/services/medicine.service";

export default function OrderStatusDropdown({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setStatus(newStatus);
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={loading}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`text-[11px] font-bold uppercase py-1 px-2 rounded-md border outline-none cursor-pointer transition-all
          ${status === 'PLACED' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
            status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-200' : 
            status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-200' : 
            'bg-zinc-100 text-zinc-600 border-zinc-200'}
        `}
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {loading && <span className="animate-spin h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full"></span>}
    </div>
  );
}