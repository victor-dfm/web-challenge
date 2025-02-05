"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

import styles from "./cart.module.css";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItemsGridContainer}>
        <p className={styles.title}>Cart ({cart.length})</p>
        {cart.length === 0 ? (
          <p className={styles.noItems}>
            You have no items in your shopping cart.
          </p>
        ) : (
          <div className={styles.cartItemsGrid}>
            {cart.map((item, index) => (
              <div key={index} className={styles.cartItemContainer}>
                <div className={styles.imageContainer}>
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className={styles.detailsContainer}>
                  <div>
                    <p className={styles.cartItemName}>{item.name}</p>
                    <p className={styles.cartItemColor}>
                      {item.selectedStorage} | {item.selectedColor}
                    </p>
                    <p className={styles.cartItemPrice}>{item.price} EUR</p>
                  </div>
                  <button
                    className={styles.cartItemRemoveButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.cartFooter}>
        <div className={styles.continueShoppingContainer}>
          <button className={styles.continueShoppingButton}>
            <Link href="/">Continue shopping</Link>
          </button>
        </div>
        <div className={styles.totalSection}>
          <span className={styles.totalText}>TOTAL</span>
          <span className={styles.totalText}>{totalPrice} EUR</span>
          <button className={styles.payButton}>PAY</button>
        </div>
      </div>
    </div>
  );
}
