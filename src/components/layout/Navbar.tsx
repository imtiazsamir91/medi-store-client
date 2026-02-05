"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { Roles } from "@/constant/roles";
import { useEffect, useState } from "react";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

// ✅ Define a type for session user including optional role
interface SessionUser {
  id: string;
  name: string;
  email: string;
  role?: Roles;
  emailVerified: boolean;
  image?: string | null;
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://as1.ftcdn.net/v2/jpg/16/99/49/30/1000_F_1699493010_XEWc9xIeWbtmIrNK4UIHBr10fvcuFuNT.jpg",
    alt: "logo",
    title: "MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "About", url: "/about" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const [userRole, setUserRole] = useState<Roles | null>(null);

  // ✅ Fetch session and get role
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          const user = data.user as SessionUser;
          setUserRole(user.role ?? null); // undefined -> null
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
        setUserRole(null);
      }
    };
    fetchSession();
  }, []);

  // ✅ Add Dashboard link only for admin or seller
  const menuWithDashboard = [...menu];
  if (userRole === Roles.admin) {
    menuWithDashboard.push({ title: "Dashboard", url: "/admin" });
  } else if (userRole === Roles.seller) {
    menuWithDashboard.push({ title: "Dashboard", url: "/seller" });
  }

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <Link href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {menuWithDashboard.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-2">
            <ModeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                      <ModeToggle />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menuWithDashboard.map((item) => (
                      <Link key={item.title} href={item.url} className="text-md font-semibold">
                        {item.title}
                      </Link>
                    ))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
