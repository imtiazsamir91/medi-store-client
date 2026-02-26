// "use server";

// import { env } from "@/env";
// import { userService } from "@/services/user.service";

// const API_URL = env.API_URL;

// export async function deleteMedicine(id: string) {
//   const { data: session, error } = await userService.getSession();
//   if (error || !session?.user?.id) throw new Error("Unauthorized");

//   const res = await fetch(`${API_URL}/api/seller/medicines/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       // যদি auth token প্রয়োজন হয়:
//        "Authorization": `Bearer ${session.token}`,
//     },
//   });

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`Failed to delete medicine: ${err}`);
//   }

//   return await res.json();
// }
