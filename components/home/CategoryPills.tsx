"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/menu";
import { useUIStore } from "@/store";

export default function CategoryPills() {
  const { activeCategory, setActiveCategory } = useUIStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-5">
      <div
        ref={ref}
        className="flex gap-2 px-4 overflow-x-auto no-scrollbar pb-1"
      >
        {categories.map((cat, i) => {
          const active = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium flex-shrink-0 transition-all duration-250 ${
                active
                  ? "text-black font-semibold"
                  : "text-[#7a6e50] bg-[#171410] border border-[#2c2820]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="catBg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB800] to-[#F97316]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span className="relative text-base leading-none">{cat.icon}</span>
              <span className="relative">{cat.label}</span>
              {active && (
                <span className="relative ml-0.5 text-xs opacity-70">
                  {cat.count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
