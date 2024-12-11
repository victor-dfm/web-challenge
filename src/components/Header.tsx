"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { BsBag } from "react-icons/bs";
import { BsBagFill } from "react-icons/bs";

import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart();
  const pathname = usePathname();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isCartPage = pathname === "/cart";

  return (
    <header className="header">
      <Link href="/">
        <p>WebChallengeLogo</p>
      </Link>
      <div className="cart">
        <Link href="/cart">
          {isCartPage ? (
            <BsBagFill className="icon" />
          ) : (
            <BsBag className="icon" />
          )}
        </Link>
        <span className="counter">{cartCount}</span>
      </div>
    </header>
  );
}
