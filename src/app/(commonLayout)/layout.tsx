import { Footer2 } from "@/components/layout/footer2";

import { Navbar1 } from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar1 />
        
        {children}
        <Footer2 />
      </body>
    </html>
  );
}

