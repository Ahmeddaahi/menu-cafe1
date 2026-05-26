"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/store";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    href: "/categories",
    label: "Menu",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    href: "/cart",
    label: "Cart",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    showBadge: true,
  },
  {
    href: "/favorites",
    label: "Saved",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.count());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50">
      <div className="glass border-t border-[#2c2820]/80 px-2 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link href={item.href} key={item.href} className="flex-1 flex justify-center no-underline select-none">
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl min-w-[60px] cursor-pointer w-full"
                >
                {/* Active background pill */}
                {active && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-2xl bg-[#FFB800]/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}

                {/* Icon */}
                <span className={`relative transition-colors duration-200 ${active ? "text-[#FFB800]" : "text-[#6b5e3a]"}`}>
                  {item.icon(active)}
                </span>

                {/* Cart badge */}
                {item.showBadge && mounted && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#F97316] text-black text-[10px] font-bold flex items-center justify-center px-1"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}

                {/* Label */}
                <span
                  className={`relative text-[10px] font-medium transition-colors duration-200 ${
                    active ? "text-[#FFB800]" : "text-[#6b5e3a]"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
