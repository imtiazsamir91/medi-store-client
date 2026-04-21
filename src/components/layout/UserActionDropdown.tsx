"use client";
import { manageUserAction } from "@/services/medicine.service";
//import { manageUserAction } from "@/services/user.service";
import { toast } from "sonner";

export default function UserActionDropdown({ user }: { user: any }) {
  const handleUpdate = async (updateData: any) => {
    const res = await manageUserAction(user.id, updateData);
    if (res.success) toast.success("Success!");
    else toast.error("Failed to update");
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      <select 
        defaultValue={user.role}
        onChange={(e) => handleUpdate({ role: e.target.value })}
        className="bg-zinc-800 text-xs text-white border border-zinc-700 rounded px-2 py-1 outline-none"
      >
        <option value="CUSTOMER">Customer</option>
        <option value="SELLER">Seller</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button 
        onClick={() => handleUpdate({ status: user.status === "BLOCKED" ? "ACTIVE" : "BLOCKED" })}
        className={`text-xs px-3 py-1 rounded border transition-all ${
          user.status === "BLOCKED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
        }`}
      >
        {user.status === "BLOCKED" ? "Unblock" : "Block"}
      </button>

      {!user.emailVerified && (
        <button 
          onClick={() => handleUpdate({ emailVerified: true })}
          className="text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded"
        >
          Verify
        </button>
      )}
    </div>
  );
}