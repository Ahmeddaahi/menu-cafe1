"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, menuItems } from "@/data/menu";
import FoodCard from "@/components/home/FoodCard";
import PageShell from "@/components/layout/PageShell";

export default function CategoriesPage() {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? menuItems.filter((m) => m.category === active)
    : [];

  const categoryColors: Record<string, string> = {
    popular:  "from-[#FFB800] to-[#F97316]",
    wraps:    "from-[#F97316] to-[#EF4444]",
    kebab:    "from-[#EF4444] to-[#DC2626]",
    burgers:  "from-[#8B5CF6] to-[#6D28D9]",
    pizza:    "from-[#EC4899] to-[#BE185D]",
    sides:    "from-[#10B981] to-[#059669]",
    drinks:   "from-[#06B6D4] to-[#0284C7]",
    desserts: "from-[#F59E0B] to-[#D97706]",
  };

  return (
    <PageShell>
      <header className="px-4 pt-12 pb-6">
        <p className="text-[#7a6e50] text-xs tracking-widest uppercase mb-0.5">Explore All</p>
        <h1 className="text-white text-2xl font-bold">
          Our <span className="text-gradient">Menu</span>
        </h1>
      </header>

      {!active ? (
        /* Category grid */
        <div className="px-4 pb-6 grid grid-cols-2 gap-3">
          {categories.filter((c) => c.id !== "all").map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActive(cat.id)}
              className={`relative h-32 rounded-2xl overflow-hidden bg-gradient-to-br ${categoryColors[cat.id] ?? "from-[#2c2820] to-[#1e1b13]"} flex flex-col items-start justify-end p-4`}
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <span className="text-4xl mb-1 relative">{cat.icon}</span>
              <span className="text-white font-bold text-base relative">{cat.label}</span>
              <span className="text-white/70 text-xs relative">{cat.count} dishes</span>
            </motion.button>
          ))}
        </div>
      ) : (
        /* Filtered items */
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="px-4 pb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setActive(null)}
                className="w-9 h-9 rounded-full bg-[#171410] border border-[#2c2820] flex items-center justify-center text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </motion.button>
              <h2 className="text-white font-bold text-lg capitalize">
                {categories.find((c) => c.id === active)?.label}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filtered.map((item, i) => (
                <FoodCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </PageShell>
  );
}
