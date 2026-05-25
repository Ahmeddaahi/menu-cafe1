"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem, CartItem } from "@/types";

/* ───── Cart Store ───── */
interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      count: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "shawarma-cart" }
  )
);

/* ───── Favorites Store ───── */
interface FavState {
  ids: string[];
  toggle: (id: string) => void;
  isFav: (id: string) => boolean;
}

export const useFavStore = create<FavState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((x) => x !== id)
            : [...s.ids, id],
        })),
      isFav: (id) => get().ids.includes(id),
    }),
    { name: "shawarma-favs" }
  )
);

/* ───── UI / Modal Store ───── */
interface UIState {
  selectedItem: MenuItem | null;
  searchQuery: string;
  activeCategory: string;
  setSelectedItem: (item: MenuItem | null) => void;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (c: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  selectedItem: null,
  searchQuery: "",
  activeCategory: "all",
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveCategory: (c) => set({ activeCategory: c }),
}));
