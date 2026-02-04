import { env } from "@/env"

const API_URL = env.API_URL!;

export const medicineService = {
  getMedicinePost: async function () {
    try {
      const res = await fetch(`${API_URL}/api/medicines`, {cache:"no-store"})

      if (!res.ok) {
        return { data: null, error: { message: "Request failed" } }
      }

      const result = await res.json()

      if (result.ok) {
        return { data: result.data, error: null }
      }

      return { data: null, error: { message: "API returned ok=false" } }

    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } }
    }
  }
}
