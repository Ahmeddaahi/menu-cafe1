"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  accent: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

export default function SectionHeader({ title, accent, subtitle, action }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-end justify-between px-4 mb-4"
    >
      <div>
        <h2 className="text-white text-lg font-bold leading-tight">
          {title}{" "}
          <span className="text-gradient">{accent}</span>
        </h2>
        {subtitle && <p className="text-[#7a6e50] text-xs mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-[#FFB800] text-xs font-semibold hover:text-[#F97316] transition-colors"
        >
          {action.label} →
        </button>
      )}
    </motion.div>
  );
}
