import ProfileView from "@/components/layout/ProfileEditForm"; 
import { getMyProfile } from "@/services/medicine.service";

export default async function ProfilePage() {
 

  return (
    <div className="max-w-2xl mx-auto py-32 px-4">
     
      <ProfileView /> 
    </div>
  );
}