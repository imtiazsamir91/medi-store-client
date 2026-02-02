import { env } from "@/env";
import { cookies } from "next/headers";


const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies(); 
      const cookieHeader = cookieStore.getAll()
        .map(c => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (!session) {
        return { data: null, error: { message: "No session found" } };
      }

      return { data: session, error: null };
    } catch (err: any) {
      console.error("Error fetching session:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
