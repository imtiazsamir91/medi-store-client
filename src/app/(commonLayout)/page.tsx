import MedicineCard from "@/components/modules/homepage/medicineCard";
import { medicineService } from "@/services/medicine.service";
import { Product } from "@/types";

type MedicineResponse = {
  data: Product[] | null;
  error: { message: string } | null;
};

export default async function Home() {
  const res: MedicineResponse = await medicineService.getMedicinePost();
  const products: Product[] = res.data || [];

  if (res.error) {
    console.error("API Error:", res.error.message);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Medicines</h1>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <MedicineCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
