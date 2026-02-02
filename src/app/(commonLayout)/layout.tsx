import { Navbar1 } from "@/components/layout/Navbar";

export default function Commonlayout({children}:{children:React.ReactNode}) {
  return (
    <div>
         <Navbar1 />
      {children}
    </div>
  );
}