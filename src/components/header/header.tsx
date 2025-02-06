"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { usePathname } from "next/navigation";
import { BsBag } from "react-icons/bs";
import { BsBagFill } from "react-icons/bs";

import styles from "./header.module.css";

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
        <Link href="/cart" aria-label="Go to cart">
          {isCartPage ? (
            <BsBagFill data-testid="cart-icon-filled" className={styles.icon} />
          ) : (
            <BsBag data-testid="cart-icon-empty" className={styles.icon} />
          )}
        </Link>
        <span className={styles.counter} data-testid="cart-counter">
          {cartCount}
        </span>
      </div>
    </header>
  );
}
