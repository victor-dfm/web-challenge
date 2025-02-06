"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { BsBag } from "react-icons/bs";
import { BsBagFill } from "react-icons/bs";

import styles from "./Header.module.css";

export default function Header() {
  const { cart } = useCart();
  const pathname = usePathname();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isCartPage = pathname === "/cart";

  return (
    <header className={styles.header}>
      <Link href="/">
        <p>WebChallengeLogo</p>
      </Link>
      <div className={styles.cart}>
        <Link href="/cart">
          {isCartPage ? (
            <BsBagFill className={styles.icon} />
          ) : (
            <BsBag className={styles.icon} />
          )}
        </Link>
        <span className={styles.counter}>{cartCount}</span>
      </div>
    </header>
  );
}
