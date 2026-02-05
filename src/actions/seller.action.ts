"use server"
import { medicineService } from "@/services/medicine.service"


export const getMedicin = async ()=>{
    return await medicineService.getMedicinePost();

}