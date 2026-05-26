"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store";
import PageShell from "@/components/layout/PageShell";
import { useRouter } from "next/navigation";

const DELIVERY_FEE = 2.50;
const FREE_DELIVERY_THRESHOLD = 25;

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total } = useCartStore();
  const router = useRouter();
  const subtotal = total();
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grand = subtotal + delivery;

  return (
    <PageShell>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-12 pb-5">
        <div>
          <p className="text-[#7a6e50] text-xs tracking-widest uppercase mb-0.5">Your Order</p>
          <h1 className="text-white text-2xl font-bold">
            Cart <span className="text-gradient">({items.length})</span>
          </h1>
        </div>
        {items.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={clearCart}
            className="text-[#7a6e50] text-xs border border-[#2c2820] px-3 py-1.5 rounded-full hover:text-[#FF6B6B] hover:border-[#FF6B6B]/30 transition-colors"
          >
            Clear all
          </motion.button>
        )}
      </header>

      {items.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center px-4 py-24 text-center"
        >
          <div className="text-7xl mb-5">🛒</div>
          <h2 className="text-white text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-[#7a6e50] text-sm mb-8 max-w-xs">
            Looks like you haven&apos;t added anything yet. Explore our menu!
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-8 py-3.5 rounded-full font-bold text-sm text-black bg-gradient-to-r from-[#FFB800] to-[#F97316]"
          >
            Browse Menu
          </motion.button>
        </motion.div>
      ) : (
        <div className="px-4 pb-8">
          {/* Delivery progress bar */}
          {subtotal < FREE_DELIVERY_THRESHOLD && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-2xl bg-[#171410] border border-[#2c2820]"
            >
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#c4b585]">Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for free delivery 🚀</span>
                <span className="text-[#FFB800] font-semibold">{Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-[#2c2820] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#FFB800] to-[#F97316] rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Cart items */}
          <div className="space-y-3 mb-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 p-3 rounded-2xl bg-[#171410] border border-[#2c2820]"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-white text-sm font-semibold line-clamp-1">{item.name}</h3>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => removeItem(item.id)}
                        className="text-[#4a4230] hover:text-[#FF6B6B] transition-colors flex-shrink-0 mt-0.5"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </motion.button>
                    </div>

                    <div className="text-[#FFB800] font-bold text-sm mt-0.5 mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-[#2c2820] text-white text-lg flex items-center justify-center font-bold"
                      >
                        −
                      </motion.button>
                      <span className="w-6 text-center text-white text-sm font-bold">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-[#FFB800] text-black text-lg flex items-center justify-center font-bold"
                      >
                        +
                      </motion.button>
                      <span className="text-[#7a6e50] text-xs ml-1">× ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-2xl bg-[#171410] border border-[#2c2820] mb-5"
          >
            <h3 className="text-[#c4b585] text-xs font-semibold uppercase tracking-wider mb-4">Order Summary</h3>

            <div className="space-y-2.5 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#7a6e50]">Subtotal ({items.length} items)</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7a6e50]">Delivery</span>
                {delivery === 0 ? (
                  <span className="text-[#22C55E] font-medium">FREE 🎉</span>
                ) : (
                  <span className="text-white font-medium">${delivery.toFixed(2)}</span>
                )}
              </div>
              <div className="h-px bg-[#2c2820]" />
              <div className="flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-[#FFB800] font-bold text-lg">${grand.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment row */}
          <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl bg-[#171410] border border-[#2c2820]">
            <div className="w-9 h-9 rounded-xl bg-[#2c2820] flex items-center justify-center text-lg">💳</div>
            <div className="flex-1">
              <p className="text-white text-xs font-semibold">Card ending in 4242</p>
              <p className="text-[#7a6e50] text-xs">Tap to change payment method</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#7a6e50]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>

          {/* Checkout */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl font-bold text-base text-black bg-gradient-to-r from-[#FFB800] to-[#F97316] flex items-center justify-between px-6"
            style={{ boxShadow: "0 12px 40px rgba(255,184,0,0.3)" }}
          >
            <span>Place Order</span>
            <span className="bg-black/20 px-3 py-1 rounded-full text-sm">${grand.toFixed(2)}</span>
          </motion.button>

          <p className="text-center text-[#4a4230] text-xs mt-3">
            Estimated prep time: 15–25 minutes
          </p>
        </div>
      )}
    </PageShell>
  );
}
