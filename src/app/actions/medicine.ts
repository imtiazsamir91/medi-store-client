"use server";

import { env } from "@/env";
import { userService } from "@/services/user.service";

const API_URL = env.API_URL;

export async function getMyMedicinesById() {
  // session নাও
  const { data: session, error } = await userService.getSession();

  // ==========================
  // Server-side console logs
 // console.log("===== getMyMedicines called =====");
 // console.log("Session:", session);
  //console.log("Error:", error);
  //console.log("=================================");
  // ==========================

  if (error || !session?.user?.id) throw new Error("Unauthorized");

  const sellerId = session.user.id;

  const res = await fetch(`${API_URL}/api/seller/${sellerId}`, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${session.token}`, // প্রয়োজন হলে ব্যবহার করো
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch medicines");

  const data = await res.json();
  console.log("Fetched medicines:", data); // ফেচ করা ডেটাও দেখাবে
  return data;
}
