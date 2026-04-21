"use client";

import { ShoppingCart, Sparkles, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar1 = () => {
  const [session, setSession] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // ড্রপডাউন স্টেট
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setSession(data);
      } catch (err) {
        setSession(null);
      }
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  const menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "About", url: "/about" },
  ];

  const userRole = session?.user?.role?.toUpperCase();
  if (userRole === "ADMIN") menu.push({ title: "Admin", url: "/admin" });
  if (userRole === "SELLER") menu.push({ title: "Seller", url: "/seller" });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "pointer-events-auto flex items-center justify-between px-6 py-3 rounded-[24px] transition-all duration-500",
          scrolled 
            ? "w-full max-w-[1000px] bg-white/80 dark:bg-[#0F0E47]/80 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl" 
            : "w-full max-w-[1200px] bg-transparent border border-transparent"
        )}
      >
     
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#272757] to-[#8686AC] flex items-center justify-center border border-white/20 shadow-lg">
            <Sparkles className="size-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-[#0F0E47] dark:text-white">
            Medi<span className="text-[#8686AC]">Store</span>
          </span>
        </Link>

     
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

        
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          <Link href="/cart" className="relative p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-black/5 dark:hover:border-white/10">
            <ShoppingCart className="size-5 text-[#0F0E47] dark:text-white" />
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-[#8686AC] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0F0E47]"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

         
          {session?.user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="relative size-10 rounded-full overflow-hidden border-2 border-[#8686AC]/30 hover:border-[#8686AC] transition-all bg-[#272757] flex items-center justify-center shadow-lg"
              >
                {session.user.image ? (
                  <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm uppercase">
                    {session.user.name?.charAt(0)}
                  </span>
                )}
              </button>

             
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 bg-white dark:bg-[#0F0E47] border border-black/5 dark:border-white/10 rounded-[24px] shadow-2xl p-2 backdrop-blur-3xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 mb-2">
                      <p className="text-[10px] font-black text-[#8686AC] uppercase tracking-widest">Logged in as</p>
                      <p className="text-sm font-bold truncate dark:text-white">{session.user.name}</p>
                    </div>

                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all">
                      <User className="size-4" /> Profile
                    </Link>
                    
                    {userRole && (
                      <Link href={`/${userRole.toLowerCase()}`} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all">
                        <LayoutDashboard className="size-4" /> Dashboard
                      </Link>
                    )}

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <LogOut className="size-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="hidden lg:flex rounded-full px-5 font-black text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-6 py-5 font-black text-[10px] uppercase tracking-[0.2em] bg-[#272757] dark:bg-white text-white dark:text-[#0F0E47] hover:bg-[#8686AC] dark:hover:bg-[#8686AC] shadow-xl transition-all border-none">
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};