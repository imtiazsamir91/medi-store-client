import { addMedicine } from "@/components/modules/medicine/addMedicine/addMedicine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";


const API_URL = env.API_URL;

type Category = { id: string; name: string };

export default async function AddMedicineCard() {
  // Fetch categories (Server Component)
  const res = await fetch(`${API_URL}/api/medicine/categories`, { cache: "no-store" });
  const json = await res.json();
  const categories: Category[] = Array.isArray(json) ? json : json.data ?? [];

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Add Medicine</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="medicine-form" action={addMedicine}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input name="title" placeholder="Medicine Name" required />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input name="description" placeholder="Description" required />
            </Field>

            <Field>
              <FieldLabel>Price</FieldLabel>
              <Input name="price" type="number" placeholder="Price" required />
            </Field>

            <Field>
              <FieldLabel>Stock</FieldLabel>
              <Input name="stock" type="number" placeholder="Stock" required />
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>
              <select name="categoryId" required className="w-full rounded-md border px-3 py-2">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </Field>
          </FieldGroup>
          <CardFooter>
            <Button form="medicine-form" type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
