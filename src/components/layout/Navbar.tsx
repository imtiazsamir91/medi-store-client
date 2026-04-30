"use client";

import { ShoppingCart, Sparkles, User, LogOut, LayoutDashboard, Menu, X, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client"; // নিশ্চিত করুন এখানে useSession আছে
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar1 = () => {
 
  const { data: session, isPending } = authClient.useSession();
  
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh(); 
        },
      },
    });
  };

  const menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "About", url: "/about" },
  ];

  
  const userRole = (session?.user as { role?: string } | undefined)?.role?.toUpperCase();
  if (userRole === "ADMIN") menu.push({ title: "Admin", url: "/admin" });
  if (userRole === "SELLER") menu.push({ title: "Seller", url: "/seller" });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "pointer-events-auto flex items-center justify-between px-4 md:px-6 py-3 rounded-[24px] transition-all duration-500 relative",
          scrolled 
            ? "w-full max-w-[1000px] bg-white/90 dark:bg-[#0F0E47]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl" 
            : "w-full max-w-[1200px] bg-transparent border border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group z-[101]">
          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#272757] to-[#8686AC] flex items-center justify-center border border-white/20 shadow-lg">
            <Sparkles className="size-4 md:size-5 text-white" />
          </div>
          <span className="text-lg md:text-xl font-black tracking-tighter text-[#0F0E47] dark:text-white">
            Medi<span className="text-[#8686AC]">Store</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
          {menu.map((item) => (
            <Link 
              key={item.title} 
              href={item.url} 
              className="px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-white/60 hover:text-black dark:hover:text-white transition-all"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3 z-[101]">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          <Link href="/cart" className="relative p-2 md:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all">
            <ShoppingCart className="size-5 text-[#0F0E47] dark:text-white" />
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-[#8686AC] text-white text-[9px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0F0E47]"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Combined Profile/Auth Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="size-9 md:size-10 rounded-full overflow-hidden border-2 border-[#8686AC]/30 hover:border-[#8686AC] transition-all bg-[#272757] flex items-center justify-center shadow-lg cursor-pointer"
            >
              {isPending ? (
                <div className="w-full h-full animate-pulse bg-gray-400" />
              ) : session?.user?.image ? (
                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="size-5 text-white" />
              )}
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 top-full mt-4 w-56 bg-white dark:bg-[#0F0E47] border border-black/10 dark:border-white/10 rounded-[24px] shadow-2xl p-2 backdrop-blur-3xl z-[150]"
                >
                  {!isPending && session?.user ? (
                    <>
                      <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 mb-2">
                        <p className="text-[10px] font-black text-[#8686AC] uppercase tracking-widest">Account</p>
                        <p className="text-sm font-bold truncate dark:text-white">{session.user.name}</p>
                      </div>
                      <Link href="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all">
                        <User className="size-4" /> Profile
                      </Link>
                      {userRole && (
                        <Link href={`/${userRole.toLowerCase()}`} onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all">
                          <LayoutDashboard className="size-4" /> Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all cursor-pointer">
                        <LogOut className="size-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 mb-2">
                        <p className="text-[10px] font-black text-[#8686AC] uppercase tracking-widest">Welcome</p>
                        <p className="text-sm font-bold dark:text-white">Guest User</p>
                      </div>
                      <Link href="/login" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all">
                        <LogIn className="size-4" /> Log In
                      </Link>
                      <Link href="/register" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#272757] dark:text-[#8686AC] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all">
                        <UserPlus className="size-4" /> Join Now
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0F0E47] dark:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0F0E47] border border-black/5 dark:border-white/10 rounded-[24px] shadow-2xl overflow-hidden md:hidden p-4 flex flex-col gap-2 backdrop-blur-xl z-[140]"
            >
              {menu.map((item) => (
                <Link 
                  key={item.title} 
                  href={item.url} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
                >
                  {item.title}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};