"use client";

import BottomNav from "./BottomNav";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh pb-24">
      {children}
      <BottomNav />
    </div>
  );
}
