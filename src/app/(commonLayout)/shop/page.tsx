import ShopPageContent from "@/components/layout/ShopPageContent";
import { getAllCategories, getMedicinePost } from "@/services/medicine.service";


export default async function ShopPage() {
 
  const categoriesResponse = await getAllCategories();
  const medicinesResponse = await getMedicinePost();

 
  return (
    <ShopPageContent 
      categories={categoriesResponse?.data || []} 
      allProducts={medicinesResponse?.data || []} 
    />
  );
}