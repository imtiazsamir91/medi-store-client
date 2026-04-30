"use server"; 

import { env } from "@/env";
import { cookies } from "next/headers";


//export const dynamic = 'force-dynamic';

const AUTH_URL = env.AUTH_URL;

export async function getSession() {
  try {
    const cookieStore = await cookies(); 
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    
    if (!res.ok) return null;

    const session = await res.json();

   
    if (!session || !session.user) {
      return null;
    }

    console.log(" Session Data in Service:", session.user.email);
    
  
    return session;

  } catch (err: any) {
    console.error("Error fetching session:", err);
    return null; 
  }
}