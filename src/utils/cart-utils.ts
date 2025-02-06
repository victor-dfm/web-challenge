import { CartItem } from "@/context/cart-context";

export const addToCartUtil = (
  currentCart: CartItem[],
  newItem: CartItem,
): CartItem[] => {
  const existingItemIndex = currentCart.findIndex(
    (cartItem) =>
      cartItem.id === newItem.id &&
      cartItem.selectedStorage === newItem.selectedStorage &&
      cartItem.selectedColor === newItem.selectedColor,
  );

  if (existingItemIndex !== -1) {
    return currentCart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...currentCart, { ...newItem, quantity: 1 }];
};
