"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFavStore } from "@/store";
import { menuItems } from "@/data/menu";
import FoodCard from "@/components/home/FoodCard";
import PageShell from "@/components/layout/PageShell";

export default function FavoritesPage() {
  const { ids } = useFavStore();
  const router  = useRouter();
  const favItems = menuItems.filter((m) => ids.includes(m.id));

  return (
    <PageShell>
      <header className="px-4 pt-12 pb-6">
        <p className="text-[#7a6e50] text-xs tracking-widest uppercase mb-0.5">Your Wishlist</p>
        <h1 className="text-white text-2xl font-bold">
          Saved <span className="text-gradient">Items</span>
        </h1>
      </header>

      {favItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center px-4 py-20 text-center"
        >
          <div className="text-7xl mb-5">🤍</div>
          <h2 className="text-white text-xl font-bold mb-2">Nothing saved yet</h2>
          <p className="text-[#7a6e50] text-sm mb-8 max-w-xs">
            Tap the heart on any dish to save it here for later.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-8 py-3.5 rounded-full font-bold text-sm text-black bg-gradient-to-r from-[#FFB800] to-[#F97316]"
          >
            Explore Menu
          </motion.button>
        </motion.div>
      ) : (
        <div className="px-4 pb-6">
          <p className="text-[#7a6e50] text-xs mb-4">{favItems.length} saved dishes</p>
          <div className="grid grid-cols-2 gap-3">
            {favItems.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
