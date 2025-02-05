import React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "../components/Header/Header";

export const metadata: Metadata = {
  title: "Web Challenge",
  description: "Web with Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
