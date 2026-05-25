"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/types";
import { useCartStore, useFavStore, useUIStore } from "@/store";

interface FoodCardProps {
  item: MenuItem;
  index: number;
  variant?: "default" | "wide";
}

export default function FoodCard({ item, index, variant = "default" }: FoodCardProps) {
  const addItem    = useCartStore((s) => s.addItem);
  const cartItems  = useCartStore((s) => s.items);
  const { toggle, isFav } = useFavStore();
  const setSelected = useUIStore((s) => s.setSelectedItem);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const inCart = mounted ? cartItems.find((c) => c.id === item.id) : undefined;
  const fav    = mounted ? isFav(item.id) : false;

  if (variant === "wide") {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelected(item)}
        className="flex gap-3 p-3 rounded-2xl bg-[#171410] border border-[#2c2820] cursor-pointer active:scale-[0.98] transition-all hover:border-[#FFB800]/20"
      >
        {/* Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
          {/* Badges */}
          {item.new && (
            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#22C55E] text-black text-[8px] font-bold">NEW</span>
          )}
          {item.spicy && (
            <span className="absolute top-1 right-1 text-sm">🌶️</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 className="text-white text-sm font-semibold leading-tight line-clamp-1">{item.name}</h3>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => { e.stopPropagation(); toggle(item.id); }}
              className={`flex-shrink-0 transition-colors ${fav ? "text-[#FF6B6B]" : "text-[#4a4230]"}`}
            >
              <svg viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </motion.button>
          </div>

          <p className="text-[#7a6e50] text-xs leading-snug line-clamp-2 mb-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#FFB800] font-bold text-sm">£{item.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[#FFB800] text-xs">★</span>
                <span className="text-[#7a6e50] text-xs">{item.rating} ({item.reviews})</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={(e) => { e.stopPropagation(); addItem(item); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                inCart
                  ? "bg-[#FFB800] text-black"
                  : "bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default card (vertical)
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.07, duration: 0.4 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => setSelected(item)}
      className="relative bg-[#171410] rounded-2xl overflow-hidden border border-[#2c2820] cursor-pointer food-card hover:border-[#FFB800]/20"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="240px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-transparent to-transparent" />

        {/* Tag badge */}
        {item.tags?.[0] && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#FFB800] text-black text-[9px] font-bold uppercase tracking-wide">
            {item.tags[0]}
          </span>
        )}
        {item.new && !item.tags?.[0] && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#22C55E] text-black text-[9px] font-bold uppercase">
            New
          </span>
        )}

        {/* Fav button */}
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={(e) => { e.stopPropagation(); toggle(item.id); }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
            fav ? "bg-[#FF6B6B]/20 text-[#FF6B6B]" : "bg-black/40 text-[#7a6e50]"
          }`}
        >
          <svg viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </motion.button>

        {/* Badges strip */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {item.spicy && <span className="text-sm">🌶️</span>}
          {item.vegetarian && <span className="text-sm">🌱</span>}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold leading-snug mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-[#7a6e50] text-xs leading-snug mb-2.5 line-clamp-2">{item.description}</p>

        {/* Rating + prep time */}
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-0.5 text-xs text-[#c4b585]">
            <span className="text-[#FFB800]">★</span> {item.rating}
          </span>
          <span className="text-[#2c2820]">·</span>
          <span className="text-xs text-[#7a6e50]">⏱ {item.prepTime}</span>
          {item.calories && (
            <>
              <span className="text-[#2c2820]">·</span>
              <span className="text-xs text-[#7a6e50]">{item.calories} cal</span>
            </>
          )}
        </div>

        {/* Price + add */}
        <div className="flex items-center justify-between">
          <span className="text-[#FFB800] font-bold text-base">£{item.price.toFixed(2)}</span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); addItem(item); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              inCart
                ? "bg-[#FFB800] text-black shadow-lg shadow-amber-500/30"
                : "bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800]"
            }`}
          >
            {inCart ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Active cart item quantity badge */}
      {inCart && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 left-2 w-5 h-5 rounded-full bg-[#F97316] text-black text-[10px] font-bold flex items-center justify-center"
        >
          {inCart.quantity}
        </motion.div>
      )}
    </motion.article>
  );
}
