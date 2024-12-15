"use client";

import { useCart } from "@/context/CartContext";

import "../../styles/Cart.css";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cartContainer">
      <div className="cartItemsGridContainer">
        <p className="title">Cart ({cart.length})</p>
        {cart.length === 0 ? (
          <p className="noItems">You have no items in your shopping cart.</p>
        ) : (
          <div className="cartItemsGrid">
            {cart.map((item, index) => (
              <div key={index} className="cartItemContainer">
                <div className="imageContainer">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="detailsContainer">
                  <div>
                    <p className="cartItemName">{item.name}</p>
                    <p className="cartItemColor">
                      {item.selectedStorage} | {item.selectedColor}
                    </p>
                    <p className="cartItemPrice">{item.price} EUR</p>
                  </div>
                  <button
                    className="cartItemRemoveButton"
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

      <div className="cartFooter">
        <div className="continueShoppingContainer">
          <button className="continueShoppingButton">
            <Link href="/">Continue shopping</Link>
          </button>
        </div>
        <div className="totalSection">
          <span className="totalText">TOTAL</span>
          <span className="totalText">{totalPrice} EUR</span>
          <button className="payButton">PAY</button>
        </div>
      </div>
    </div>
  );
}
