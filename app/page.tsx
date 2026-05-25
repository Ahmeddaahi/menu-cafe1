"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import FeaturedBanner from "@/components/home/FeaturedBanner";
import SearchBar from "@/components/home/SearchBar";
import CategoryPills from "@/components/home/CategoryPills";
import FoodCard from "@/components/home/FoodCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { menuItems, popularItems } from "@/data/menu";
import { useUIStore } from "@/store";

export default function HomePage() {
  const { searchQuery, activeCategory } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [greeting, setGreeting] = useState("Good afternoon");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      
      let greet = "Good afternoon";
      if (hours < 12) {
        greet = "Good morning";
      } else if (hours < 17) {
        greet = "Good afternoon";
      } else if (hours < 22) {
        greet = "Good evening";
      } else {
        greet = "Good night";
      }
      setGreeting(greet);

      const formatted = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setTimeString(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== "all" && activeCategory !== "popular") {
      items = items.filter((i) => i.category === activeCategory);
    }
    if (activeCategory === "popular") {
      items = items.filter((i) => i.popular);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [searchQuery, activeCategory]);

  const showDefault = !searchQuery && activeCategory === "all";

  return (
    <PageShell>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-12 pb-5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-[#7a6e50] text-xs tracking-widest uppercase mb-0.5">
            {mounted ? `${greeting} 👋 • ${timeString}` : "Good afternoon 👋"}
          </p>
          <h1 className="text-white text-2xl font-bold leading-tight">
            What would you like <br />
            <span className="text-gradient">to eat today?</span>
          </h1>
        </motion.div>

        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFB800] to-[#F97316] flex items-center justify-center flex-shrink-0"
          style={{ boxShadow: "0 8px 24px rgba(255,184,0,0.35)" }}
        >
          <span className="text-black font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>SW</span>
        </motion.div>
      </header>

      <SearchBar />

      {showDefault && <FeaturedBanner />}

      <div className="mt-2">
        <SectionHeader
          title="Browse by"
          accent="Category"
        />
        <CategoryPills />
      </div>

      {/* Search results or popular or filtered */}
      <AnimatePresence mode="wait">
        {searchQuery ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-6"
          >
            <p className="text-[#7a6e50] text-xs mb-4">
              {filtered.length} results for &ldquo;{searchQuery}&rdquo;
            </p>
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <FoodCard key={item.id} item={item} index={i} variant="wide" />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="text-[#7a6e50] text-sm">No dishes found for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : activeCategory !== "all" ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((item, i) => (
                <FoodCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Popular Section */}
            <div className="mb-6">
              <SectionHeader
                title="Most"
                accent="Popular"
                subtitle="Loved by our regulars"
              />
              <div className="px-4 grid grid-cols-2 gap-3">
                {popularItems.slice(0, 4).map((item, i) => (
                  <FoodCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Recommended — wide layout */}
            <div className="mb-6">
              <SectionHeader
                title="Chef's"
                accent="Recommendations"
              />
              <div className="px-4 space-y-3">
                {menuItems.filter((i) => i.tags?.includes("chef's pick") || i.new).slice(0, 4).map((item, i) => (
                  <FoodCard key={item.id} item={item} index={i} variant="wide" />
                ))}
              </div>
            </div>

            {/* All items preview */}
            <div className="mb-6">
              <SectionHeader
                title="Explore the"
                accent="Full Menu"
                subtitle={`${menuItems.length} dishes available`}
              />
              <div className="px-4 grid grid-cols-2 gap-3">
                {menuItems.slice(0, 6).map((item, i) => (
                  <FoodCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
