"use server"
import { env } from "@/env";
import { ApiResponse, Product } from "@/types";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL!;

// export const medicineService = {
//   getMedicinePost: async function (): Promise<ApiResponse<Product[]>> {
//     try {
//       const res = await fetch(`${API_URL}/api/medicines`, { cache: "no-store" });
//       if (!res.ok) throw new Error("Request failed");

//       const json = await res.json();
//       if (json.ok) return { data: json.data, error: null };

//       return { data: null, error: { message: "API returned ok=false" } };
//     } catch (error: any) {
//       return { data: null, error: { message: error.message || "Something went wrong" } };
//     }
//   },

//   getProductById: async function (id: string): Promise<ApiResponse<Product>> {
//    try {
//       const res = await fetch(`${API_URL}/api/medicines/${id}`);
//       if (!res.ok) throw new Error("Request failed");
//       console.log(res)

//       const json = await res.json();
//        console.log(json)
//       if (json.ok) return { data: json.data, error: null };

//       return { data: null, error: { message: "API returned ok=false" } };
//     } catch (error: any) {
//       return { data: null, error: { message: error.message || "Something went wrong" } };
//     }
// },
// updateMedicine: async function (id: string, data: Partial<Product>): Promise<ApiResponse<Product>> {
//   try {
//     const res = await fetch(`${API_URL}/api/medicines/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) throw new Error("Update request failed");

//     const json = await res.json();
//     if (json.ok) return { data: json.data, error: null };

//     return { data: null, error: { message: "API returned ok=false" } };
//   } catch (error: any) {
//     return { data: null, error: { message: error.message || "Something went wrong" } };
//   }
// },
// deleteMedicine: async function (id: string): Promise<ApiResponse<null>> {
//   try {
//     const res = await fetch(`${API_URL}/api/medicines/${id}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) throw new Error("Delete request failed");

//     const json = await res.json();
//     if (json.ok) return { data: null, error: null };

//     return { data: null, error: { message: "API returned ok=false" } };
//   } catch (error: any) {
//     return { data: null, error: { message: error.message || "Something went wrong" } };
//   }
// },

// getSellerMedicines: async function () {
  
//   try {
//     const cookieStore=await cookies()
//     const res = await fetch(`${API_URL}/api/medicine/seller`, {
//       headers: { "Content-Type": "application/json" ,Cookie: cookieStore.toString(), },
//       cache: "no-store",
      
//     });
    

//     if (!res.ok) throw new Error("Request failed");


//     const json = await res.json();
//     console.log(json)

    
   

//     return { data: json, error: { message: "API failed to fetch medicines" } };
//   } catch (error: any) {
//     return { data: null, error: { message: error.message || "Something went wrong" } };
//   }
// },






// };



// ১. প্রতিটি ফাংশনকে আলাদাভাবে 'export async function' হিসেবে লিখুন
export async function getMedicinePost(): Promise<ApiResponse<Product[]>> {
    try {
        const res = await fetch(`${API_URL}/api/medicine/medicines`, { cache: "no-store" });
        const json = await res.json();
        if (res.ok) return { data: json.data, error: null };
        return { data: null, error: { message: "Failed to fetch" } };
    } catch (error: any) {
        return { data: null, error: { message: error.message } };
    }
}

export async function getProductById(id: string): Promise<ApiResponse<Product>> {
    try {
        const res = await fetch(`${API_URL}/api/medicine/medicines/${id}`);
        const json = await res.json();
        if (res.ok) return { data: json.data, error: null };
        return { data: null, error: { message: "Product not found" } };
    } catch (error: any) {
        return { data: null, error: { message: error.message } };
    }
}

// আপনার মূল ফাংশনটি এভাবে আপডেট করুন (নেস্টিং ঠিক করা হয়েছে)
export async function getSellerMedicines(): Promise<ApiResponse<Product[]>> {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/medicine/seller`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 0 },
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Failed to fetch medicines");
        }

        // এখানে সরাসরি json.data দিন কারণ ব্যাকেন্ড { success: true, data: [...] } পাঠাচ্ছে
        return {
            data: json.data, 
            error: null
        };
    } catch (error: any) {
        console.error("Fetch Error:", error.message);
        return {
            data: [],
            error: { message: error.message || "Something went wrong" }
        };
    }
}
// ১. মেডিসিন ডিলিট করার ফাংশন
export async function deleteMedicine(id: string): Promise<ApiResponse<null>> {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/seller/medicines/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Delete request failed");
    }

    // ডিলিট হওয়ার পর লিস্ট আপডেট করার জন্য পাথ রিভ্যালিডেট করুন
    revalidatePath("/seller/medicines"); 

    return { data: null, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message || "Something went wrong" } };
  }
}

// ২. মেডিসিন আপডেট করার ফাংশন
export async function updateMedicine(id: string, formData: FormData): Promise<ApiResponse<Product>> {
  try {
    const cookieStore = await cookies();
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_URL}/api/medicine/seller/medicines/${id}`, {
      method: "PUT", // বা PUT, আপনার ব্যাকেন্ড অনুযায়ী
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        name: data.title,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId: data.categoryId,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Update request failed");
    }

    revalidatePath("/seller/medicines");

    return { data: json.data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message || "Something went wrong" } };
  }
}
