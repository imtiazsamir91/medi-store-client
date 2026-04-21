// src/components/AddToCartButton.tsx
"use client";
import { useCart } from "@/providers/CartProvider";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => {
        addToCart(product);
        toast.success("Added to prescription cart!");
      }}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95"
    >
      <ShoppingCart className="w-6 h-6" /> Add to Prescription Cart
    </button>
  );
}