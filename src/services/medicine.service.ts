import { env } from "@/env";
import { ApiResponse, Product } from "@/types";

const API_URL = env.API_URL!;

export const medicineService = {
  getMedicinePost: async function (): Promise<ApiResponse<Product[]>> {
    try {
      const res = await fetch(`${API_URL}/api/medicines`, { cache: "no-store" });
      if (!res.ok) throw new Error("Request failed");

      const json = await res.json();
      if (json.ok) return { data: json.data, error: null };

      return { data: null, error: { message: "API returned ok=false" } };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Something went wrong" } };
    }
  },

  getProductById: async function (id: string): Promise<ApiResponse<Product>> {
   try {
      const res = await fetch(`${API_URL}/api/medicines/${id}`);
      if (!res.ok) throw new Error("Request failed");
      console.log(res)

      const json = await res.json();
       console.log(json)
      if (json.ok) return { data: json.data, error: null };

      return { data: null, error: { message: "API returned ok=false" } };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Something went wrong" } };
    }
}
};
