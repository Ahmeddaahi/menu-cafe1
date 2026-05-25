"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUIStore, useCartStore, useFavStore } from "@/store";
import { menuItems } from "@/data/menu";
import FoodCard from "@/components/home/FoodCard";

export default function FoodDetailModal() {
  const { selectedItem, setSelectedItem } = useUIStore();
  const addItem    = useCartStore((s) => s.addItem);
  const updateQty  = useCartStore((s) => s.updateQty);
  const cartItems  = useCartStore((s) => s.items);
  const { toggle, isFav } = useFavStore();

  const [qty, setQty] = useState(1);

  if (!selectedItem) return null;

  const inCart   = cartItems.find((c) => c.id === selectedItem.id);
  const fav      = isFav(selectedItem.id);
  const related  = menuItems.filter(
    (m) => m.category === selectedItem.category && m.id !== selectedItem.id
  ).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(selectedItem);
    setSelectedItem(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
        onClick={() => setSelectedItem(null)}
      />

      <motion.div
        key="modal"
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[201] bg-[#110f09] rounded-t-3xl overflow-hidden"
        style={{ maxHeight: "94dvh" }}
      >
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-[#2c2820] z-10" />

        <div className="overflow-y-auto max-h-[94dvh] no-scrollbar">
          {/* Hero image */}
          <div className="relative h-64">
            <Image
              src={selectedItem.image}
              alt={selectedItem.name}
              fill
              className="object-cover"
              sizes="480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#110f09] via-[#110f09]/20 to-transparent" />

            {/* Close */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Fav */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => toggle(selectedItem.id)}
              className={`absolute top-5 right-16 w-9 h-9 rounded-full glass flex items-center justify-center transition-colors ${fav ? "text-[#FF6B6B]" : "text-white"}`}
            >
              <svg viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </motion.button>

            {/* Badges */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {selectedItem.tags?.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-[#FFB800] text-black text-[10px] font-bold uppercase">
                  {t}
                </span>
              ))}
              {selectedItem.new && (
                <span className="px-2.5 py-1 rounded-full bg-[#22C55E] text-black text-[10px] font-bold uppercase">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pt-4 pb-32">
            {/* Title + rating row */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1">
                <h2 className="text-white text-xl font-bold leading-snug">{selectedItem.name}</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-sm text-[#c4b585]">
                    <span className="text-[#FFB800]">★</span>
                    <span className="font-semibold">{selectedItem.rating}</span>
                    <span className="text-[#7a6e50]">({selectedItem.reviews} reviews)</span>
                  </span>
                  <span className="text-[#2c2820]">·</span>
                  <span className="text-sm text-[#7a6e50]">⏱ {selectedItem.prepTime}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#FFB800] text-2xl font-bold">£{selectedItem.price.toFixed(2)}</div>
                {selectedItem.calories && (
                  <div className="text-[#7a6e50] text-xs mt-0.5">{selectedItem.calories} cal</div>
                )}
              </div>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedItem.vegetarian && (
                <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs">🌱 Vegetarian</span>
              )}
              {selectedItem.spicy && (
                <span className="px-2.5 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs">🌶️ Spicy</span>
              )}
              <span className="px-2.5 py-1 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs">✓ Halal</span>
            </div>

            {/* Description */}
            <div className="mb-5">
              <h3 className="text-[#c4b585] text-xs font-semibold uppercase tracking-wider mb-2">Description</h3>
              <p className="text-[#a89a6a] text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                {selectedItem.description}. Served with mixed salad, hummus, yogurt, jalapeño, homemade chili and pickles.
              </p>
            </div>

            {/* Ingredients */}
            {selectedItem.ingredients && (
              <div className="mb-6">
                <h3 className="text-[#c4b585] text-xs font-semibold uppercase tracking-wider mb-2.5">Ingredients</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.ingredients.map((ing) => (
                    <span key={ing} className="px-2.5 py-1 rounded-full bg-[#1e1b13] border border-[#2c2820] text-[#7a6e50] text-xs">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related items */}
            {related.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[#c4b585] text-xs font-semibold uppercase tracking-wider mb-3">You Might Also Like</h3>
                <div className="grid grid-cols-2 gap-3">
                  {related.map((r, i) => (
                    <FoodCard key={r.id} item={r} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky bottom action bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 glass border-t border-[#2c2820]/60">
          <div className="flex items-center gap-3">
            {/* Qty selector */}
            <div className="flex items-center gap-2 bg-[#1e1b13] rounded-full px-1 py-1">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-full bg-[#2c2820] text-white flex items-center justify-center font-bold text-lg"
              >
                −
              </motion.button>
              <span className="w-8 text-center text-white font-bold text-sm">{qty}</span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 rounded-full bg-[#FFB800] text-black flex items-center justify-center font-bold text-lg"
              >
                +
              </motion.button>
            </div>

            {/* Add button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAdd}
              className="flex-1 flex items-center justify-between px-5 py-3.5 rounded-full font-bold text-sm text-black bg-gradient-to-r from-[#FFB800] to-[#F97316]"
              style={{ boxShadow: "0 8px 30px rgba(255,184,0,0.3)" }}
            >
              <span>Add to Cart</span>
              <span>£{(selectedItem.price * qty).toFixed(2)}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
