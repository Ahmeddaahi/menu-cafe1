"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { useCartStore, useFavStore } from "@/store";

export default function ProfilePage() {
  const count = useCartStore((s) => s.count());
  const { ids } = useFavStore();

  const menuItems = [
    { icon: "📦", label: "Order History", sub: "View past orders" },
    { icon: "📍", label: "Delivery Addresses", sub: "Manage saved addresses" },
    { icon: "💳", label: "Payment Methods", sub: "Cards & digital wallets" },
    { icon: "🔔", label: "Notifications", sub: "Order updates & offers" },
    { icon: "🌐", label: "Language", sub: "English (UK)" },
    { icon: "🌙", label: "Appearance", sub: "Dark mode" },
    { icon: "❓", label: "Help & Support", sub: "FAQ, contact us" },
  ];

  return (
    <PageShell>
      <header className="px-4 pt-12 pb-6">
        <p className="text-[#7a6e50] text-xs tracking-widest uppercase mb-0.5">Account</p>
        <h1 className="text-white text-2xl font-bold">Profile</h1>
      </header>

      <div className="px-4 pb-6">
        {/* Avatar card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 rounded-2xl bg-[#171410] border border-[#2c2820] mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#F97316] flex items-center justify-center text-2xl">
            👤
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">Guest User</h2>
            <p className="text-[#7a6e50] text-xs">Sign in to save your orders</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 rounded-full text-xs font-bold text-black bg-[#FFB800]"
          >
            Sign In
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Orders", value: "0" },
            { label: "Saved", value: String(ids.length) },
            { label: "In Cart", value: String(count) },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="p-3 rounded-2xl bg-[#171410] border border-[#2c2820] text-center"
            >
              <div className="text-[#FFB800] text-xl font-bold">{stat.value}</div>
              <div className="text-[#7a6e50] text-xs mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Menu list */}
        <div className="space-y-1">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#171410] border border-[#2c2820] text-left hover:border-[#FFB800]/20 transition-colors"
            >
              <span className="text-xl w-8 text-center">{item.icon}</span>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{item.label}</div>
                <div className="text-[#7a6e50] text-xs">{item.sub}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#4a4230]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 text-center text-[#4a4230] text-xs">
          Shawarma World v1.0 · 100% Halal Certified 🌿
        </div>
      </div>
    </PageShell>
  );
}
