"use client";

import { getSellerMedicines, deleteMedicine, updateMedicine } from "@/services/medicine.service";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
};

export default function MyMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  
  // এডিট করার জন্য স্টেট
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await getSellerMedicines();
      if (res.error && !res.data) {
        toast.error(res.error.message);
        setMedicines([]);
      } else {
        setMedicines(res.data || []);
      }
    } catch (err: any) {
      toast.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // --- ডিলিট ফাংশন ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await deleteMedicine(id);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Medicine deleted successfully");
        setMedicines((prev) => prev.filter((med) => med.id !== id));
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // --- আপডেট সাবমিট ফাংশন ---
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await updateMedicine(id, formData);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Medicine updated successfully");
        setEditingId(null); // মডেল বন্ধ করা
        fetchMedicines(); // ডেটা রিফ্রেশ করা
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-4 text-center">Loading your medicines...</p>;
  if (!medicines.length) return <p className="p-4 text-center">No medicines added yet.</p>;

  return (
    <div className="p-4">
      <Toaster position="top-right" richColors />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines.map((med) => (
          <div key={med.id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
            <h3 className="font-bold text-lg">{med.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{med.description}</p>
            <p className="mt-1">Price: <span className="text-green-600 font-semibold">${med.price}</span></p>
            <p>Stock: {med.stock}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditingId(med.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(med.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>

            {/* --- আপডেট মডেল (সহজ ভার্সন) --- */}
            {editingId === med.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">Edit Medicine</h2>
                  <form onSubmit={(e) => handleUpdateSubmit(e, med.id)} className="space-y-3">
                    <input name="title" defaultValue={med.name} className="w-full border p-2 rounded dark:bg-gray-700" placeholder="Name" required />
                    <input name="description" defaultValue={med.description} className="w-full border p-2 rounded dark:bg-gray-700" placeholder="Description" required />
                    <input name="price" type="number" defaultValue={med.price} className="w-full border p-2 rounded dark:bg-gray-700" placeholder="Price" required />
                    <input name="stock" type="number" defaultValue={med.stock} className="w-full border p-2 rounded dark:bg-gray-700" placeholder="Stock" required />
                    
                    <div className="flex gap-2 justify-end mt-4">
                      <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}