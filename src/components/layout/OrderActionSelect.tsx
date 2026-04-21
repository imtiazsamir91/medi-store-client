"use client";
import React, { useState } from "react";
import { updateOrderStatus } from "@/services/medicine.service";
import { toast } from "sonner";

const OrderActionSelect = ({ orderId, currentStatus }: { orderId: string, currentStatus: string }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const statuses = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    const res = await updateOrderStatus(orderId, newStatus);
    setLoading(false);
    if (res.success) {
      setStatus(newStatus);
      toast.success("Status updated!");
    } else {
      toast.error("Failed to update");
    }
  };

  return (
    <select 
      value={status} 
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-zinc-800 text-white text-xs p-2 rounded border border-zinc-700"
    >
      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
};
export default OrderActionSelect;