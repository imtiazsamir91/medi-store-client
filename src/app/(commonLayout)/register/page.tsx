import { RegisterForm } from "@/components/modules/authentication/signup-form";

export default function Page() {
  return (
   
    <div className="flex min-h-svh w-full items-center justify-center pt-24 pb-12 md:pt-32 p-6 md:p-10">
      <div className="w-full max-w-[420px]"> 
        <RegisterForm />
      </div>
    </div>
  );
}