"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore, useUIStore } from "@/store";
import { featuredItems } from "@/data/menu";

export default function FeaturedBanner() {
  const [index, setIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const setSelected = useUIStore((s) => s.setSelectedItem);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % featuredItems.length), 4000);
    return () => clearInterval(t);
  }, []);

  const item = featuredItems[index];

  return (
    <div className="px-4 pt-2 pb-4">
      <div
        className="relative h-52 rounded-3xl overflow-hidden cursor-pointer"
        onClick={() => setSelected(item)}
      >
        {/* Image */}
        <AnimatePresence mode="sync">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority
              className="object-cover"
              sizes="480px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-[#090806]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090806]/60 to-transparent" />

        {/* Badge */}
        {item.tags?.[0] && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FFB800] text-black text-[10px] font-bold uppercase tracking-wider">
            {item.tags[0]}
          </div>
        )}
        {item.new && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#22C55E] text-black text-[10px] font-bold uppercase tracking-wider">
            New
          </div>
        )}

        {/* Halal badge */}
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center">
          <span className="text-white text-[8px] font-bold leading-tight text-center">100%<br/>HALAL</span>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id + "text"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <p className="text-[#FFB800] text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">
              Featured Today
            </p>
            <h2 className="text-white text-xl font-bold leading-tight mb-2">{item.name}</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#FFB800] text-lg font-bold">£{item.price.toFixed(2)}</span>
                <span className="flex items-center gap-1 text-xs text-[#c4b585]">
                  <span className="text-[#FFB800]">★</span> {item.rating}
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); addItem(item); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFB800] text-black text-xs font-bold"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-4 right-4 flex gap-1">
          {featuredItems.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
              className={`rounded-full transition-all duration-300 ${i === index ? "w-5 h-1.5 bg-[#FFB800]" : "w-1.5 h-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
