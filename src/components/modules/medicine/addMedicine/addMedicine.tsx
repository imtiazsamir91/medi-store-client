"use server";

import { cookies } from "next/headers";
import { env } from "@/env";
import { revalidatePath } from "next/cache";

const API_URL = env.API_URL;

export async function addMedicine(formData: FormData) {
  const cookieStore = await cookies();

 
  const payload = {
    name: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"), 
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    categoryId: formData.get("categoryId"),
  };

  const res = await fetch(`${API_URL}/api/medicine/seller/medicines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  
  if (res.ok) {
    revalidatePath("/shop");
  }

  return result;
}