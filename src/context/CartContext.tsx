"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { addToCartUtil } from "@/utils/cartUtils";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  selectedColor: string;
  selectedStorage: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isFirstRender.current) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      isFirstRender.current = false;
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => addToCartUtil(prevCart, item));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return React.createElement(
    CartContext.Provider,
    { value: { cart, addToCart, removeFromCart } },
    children,
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart() must be used within the CartProvider");
  return context;
};
