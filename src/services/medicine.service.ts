"use server";

import { env } from "@/env";
import { ApiResponse, Product } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL!;

// --- MEDICINE RELATED ACTIONS ---

//all medicines fetch করা
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

// 
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

// ৩. সেলারের নিজস্ব মেডিসিন লিস্ট দেখা
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
    if (!res.ok) throw new Error(json.message || "Failed to fetch medicines");
    return { data: json.data, error: null };
  } catch (error: any) {
    return { data: [], error: { message: error.message } };
  }
}

// -

// ৪. নতুন অর্ডার তৈরি করা
export async function createOrder(orderPayload: any) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/api/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(orderPayload),
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) return { success: false, message: result.message };
    revalidatePath("/shop");
    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: "Server connection failed" };
  }
}




// ডিলিট ফাংশন

export async function deleteMedicine(id: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/seller/medicines/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(), 
      },
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath("/dashboard/my-medicines"); 
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || "Delete failed" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ২. মেডিসিন আপডেট করার ফাংশন 
export async function updateMedicine(id: string, data: any) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/seller/medicines/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), 
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath("/dashboard/my-medicines"); 
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || "Update failed" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}



// ৫. কাস্টমারের নিজের অর্ডার দেখা
export async function getMyOrders() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/api/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 0 },
    });
    const result = await response.json();
    return { success: response.ok, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ৬. সেলারের জন্য অর্ডার দেখা 
export async function getSellerOrders() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/api/seller-view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 0 },
    });
    const result = await response.json();
    return { success: response.ok, data: result.orders };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}



// ৭. অ্যাডমিন সব অর্ডার দেখবে (ফিল্টার সহ)
export async function getAllAdminOrders(status?: string) {
  try {
    const cookieStore = await cookies();
    let url = `${API_URL}/api/all-orders`; 
    if (status && status !== 'ALL') {
      url += `?status=${status}`;
    }
    const res = await fetch(url, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Cookie: cookieStore.toString() 
      },
      next: { revalidate: 0 },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, data: [] };
  }
}

// ৮. অর্ডার স্ট্যাটাস আপডেট করা (Admin/Seller)
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/api/update-status/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status: newStatus.toUpperCase() }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Update failed");
    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ৯. অ্যাডমিন ড্যাশবোর্ড স্ট্যাটস
// export async function getAdminStats() {
//   try {
//     const cookieStore = await cookies();
//     const res = await fetch(`${API_URL}/api/admin-stats`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieStore.toString(),
//       },
//       cache: 'no-store',
//     });
//     const result = await res.json();
//     return result.ok ? result.data : result.data;
//   } catch (error: any) {
//     return null;
//   }
// }
export interface AdminStats {
  totalRevenue: number;
  totalCustomers: number;
  totalSellers: number;
  totalAdmins: number;
  totalMedicines: number;
  totalOrders: number;
  // নতুন গ্রাফ ডেটা (ফেক বা রিয়াল)
  graphs: {
    revenue: number[];
    customers: number[];
    sellers: number[];
    admins: number[];
    medicines: number[];
    orders: number[];
  };
}


export const getAdminStats = async (): Promise<AdminStats | null> => {
  try {
    const cookieStore = await cookies();
    

    const res = await fetch(`${API_URL}/api/admin-stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), 
      },
      cache: 'no-store', 
    });

    const result = await res.json();

    
    const generateTrendData = (base: number) => 
      Array.from({ length: 12 }, () => Math.floor(base * (0.7 + Math.random() * 0.6)));

  
    if (res.ok && result.data) {
      const actualData = result.data;

      return {
        ...actualData,
        graphs: {
          revenue: generateTrendData(actualData.totalRevenue || 10000),
          customers: generateTrendData(actualData.totalCustomers || 500),
          sellers: generateTrendData(actualData.totalSellers || 50),
          admins: generateTrendData(actualData.totalAdmins || 5),
          medicines: generateTrendData(actualData.totalMedicines || 1200),
          orders: generateTrendData(actualData.totalOrders || 300),
        }
      };
    }
    
    return null;
  } catch (error) {
    console.error("Critical Error: Unable to fetch Admin Stats:", error);
    return null;
  }
};

// ১০. ইউজার ম্যানেজমেন্ট (রোল আপডেট)
export async function updateUserRole(userId: string, newRole: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/users/update-role/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ role: newRole }),
    });
    const result = await res.json();
    revalidatePath("/admin/users");
    return { success: res.ok, message: result.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getAllUsers() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/users/all-users`, {
      headers: { Cookie: cookieStore.toString() },
      next: { revalidate: 0 },
    });
    return res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}


export async function manageUserAction(userId: string, data: { role: string }) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/users/update-role/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data), 
    });
    
    const result = await res.json();
    revalidatePath("/admin/users");
    return { success: res.ok, message: result.message || "Action completed" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
export async function getAllCategories() {
  try {
    const res = await fetch(`${API_URL}/api/medicine/category`, {
      // next: { revalidate: 3600 }, 
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

// নতুন ক্যাটাগরি তৈরি (Admin Only)
export async function createCategory(data: { name: string }) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    
    const result = await res.json();
    if (result.success) revalidatePath("/admin/categories");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to create category" };
  }
}
export async function deleteCategory(id: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/category/delete/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const result = await res.json();
    if (result.success) revalidatePath("/admin/categories");
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ক্যাটাগরি আপডেট
export async function updateCategory(id: string, data: { name: string }) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/category/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) revalidatePath("/admin/categories");
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
// export async function createReview(medicineId: string, data: { userId: string; rating: number; comment: string }) {
//   try {
//     const res = await fetch(`${API_URL}/api/medicine/reviews/${medicineId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// }
// export async function getProductById(id: string) {
//   try {
//     const res = await fetch(`${API_URL}/api/medicine/medicines/${id}`, {
//       cache: "no-store",
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// }

// ২. নতুন রিভিউ তৈরি করা
export async function createReview(medicineId: string, payload: { userId: string; rating: number; comment: string }) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/medicine/reviews/${medicineId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath(`/shop/${medicineId}`); 
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
export async function updateProfileInfo(formData: { name: string; phone?: string; image?: string }) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/users/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) revalidatePath("/profile"); 
    return result;
  } catch (error: any) {
    return { success: false, message: "Network error occurred" };
  }
}
export async function getMyProfile() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), 
      },
      next: { revalidate: 0 }, 
    });

    const result = await res.json();
    
    if (res.ok) {
      return { data: result.data, success: true };
    }
    
    return { data: null, success: false };
  } catch (error: any) {
    return { data: null, success: false, message: error.message };
  }
}

