import type { Metadata, Viewport } from "next";
import "./globals.css";
import FoodDetailModal from "@/components/modal/FoodDetailModal";

export const metadata: Metadata = {
  title: "Shawarma World Menu",
  description: "Browse our full menu of authentic halal Middle Eastern cuisine",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#090806",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#090806]">
        <div className="page-container shadow-2xl shadow-black/60">
          {children}
          <FoodDetailModal />
        </div>
      </body>
    </html>
  );
}
