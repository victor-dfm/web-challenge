import { CartItem } from "@/context/CartContext";

export const addToCartUtil = (
  currentCart: CartItem[],
  newItem: CartItem,
): CartItem[] => {
  const existingItem = currentCart.find(
    (cartItem) =>
      cartItem.id === newItem.id &&
      cartItem.selectedStorage === newItem.selectedStorage &&
      cartItem.selectedColor === newItem.selectedColor,
  );

  if (existingItem) {
    alert("This product has already been added to your shopping cart.");
    return currentCart;
  }

  return [...currentCart, newItem];
};
