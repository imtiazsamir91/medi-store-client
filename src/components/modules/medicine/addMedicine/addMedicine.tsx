import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

type Category = {
  id: string;
  name: string;
};

export default async function AddMedicineCard() {
  /* =======================
     FETCH CATEGORIES
  ======================== */
  const res = await fetch(`${API_URL}/api/categories`, {
    cache: "no-store",
  });

  const json = await res.json();

  // 🔹 Ensure categories is an array
  const categories: Category[] = Array.isArray(json) ? json : json.data ?? [];

  /* =======================
     SERVER ACTION
  ======================== */
  const addmedicine = async (formData: FormData) => {
    "use server";

    const data = Object.fromEntries(formData.entries());

    const cookieStore = await cookies();

    // 🔹 POST to backend
    const res = await fetch(`${API_URL}/api/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        name: data.title, // 🔹 Prisma expects 'name', not 'title'
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId: data.categoryId,
      }),
    });

    const result = await res.json();
    console.log(result); // check server response
  };

  /* =======================
     UI
  ======================== */
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Add Medicine</CardTitle>
        <CardDescription>You can add medicine</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="medicine-form" action={addmedicine}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                name="title"
                placeholder="Medicine Name"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input
                name="description"
                placeholder="Description"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Price</FieldLabel>
              <Input
                name="price"
                type="number"
                placeholder="Price"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Stock</FieldLabel>
              <Input
                name="stock"
                type="number"
                placeholder="Stock"
                required
              />
            </Field>

            {/* ✅ Dynamic Category Dropdown */}
            <Field>
              <FieldLabel>Category</FieldLabel>
              <select
                name="categoryId"
                required
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Select category</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No category found</option>
                )}
              </select>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button form="medicine-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
