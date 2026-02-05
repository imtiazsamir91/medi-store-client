import AddMedicineCard from "@/components/modules/medicine/addMedicine/addMedicine";
import { medicineService } from "@/services/medicine.service";

export default async function MedicinePage() { 
  
  const { data } = await medicineService.getMedicinePost();

 

  return ( 
    <div className="space-y-6">
      {/* Add Medicine Form */}
      <AddMedicineCard />

    
    </div>
  );
}
