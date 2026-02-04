import { Hero47 } from "@/components/layout/hero47";
import { Navbar1 } from "@/components/layout/Navbar";

export default function Commonlayout({children}:{children:React.ReactNode}) {
  return (
    <div>
         <Navbar1 />
         <Hero47/>
      {children}
    </div>
  );
}