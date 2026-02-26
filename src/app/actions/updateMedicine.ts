// "use server";

// import { env } from "@/env";
// import { userService } from "@/services/user.service";

// const API_URL = env.API_URL;

// export async function updateMedicine(id: string, formData: FormData) {
//   console.log("===== updateMedicine called =====");

//   // session fetch
//   const { data: session, error } = await userService.getSession();
//   console.log("Session:", session);
//   if (error || !session?.user?.id) throw new Error("Unauthorized");

//   const data = Object.fromEntries(formData.entries()) as {
//     title?: string;
//     description?: string;
//     price?: string;
//     stock?: string;
//     categoryId?: string;
//   };
//   console.log("Form Data:", data);

//   const sellerId = session.user.id;

//   // prepare body to match Prisma update fields
//   const body: Record<string, any> = {};
//   if (data.title) body.name = data.title;
//   if (data.description) body.description = data.description;
//   if (data.price) body.price = Number(data.price);
//   if (data.stock) body.stock = Number(data.stock);
//   if (data.categoryId) body.categoryId = data.categoryId;

//   console.log("Request Body:", body);

//   const res = await fetch(`${API_URL}/api/seller/medicines/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//      "Authorization": `Bearer ${session.session.token}`,// middleware validate করে req.user inject করবে
//     },
//     body: JSON.stringify(body),
//     credentials: "include", 
//   });

//   const responseText = await res.text();
//   console.log("API Response:", responseText);

//   if (!res.ok) throw new Error(`Failed to update medicine: ${responseText}`);

//   const json = JSON.parse(responseText);
//   console.log("Updated Medicine:", json);

//   return json;
// }
