import { addToCartUtil } from "@/utils/cartUtils";
import { CartItem } from "@/context/CartContext";

describe("addToCartUtil", () => {
  it("adds a new item to an empty cart", () => {
    const cart: CartItem[] = [];
    const newItem: CartItem = {
      id: "1",
      name: "Phone",
      price: 500,
      imageUrl: "url",
      selectedColor: "Black",
      selectedStorage: "128GB",
      quantity: 1,
    };

    const updatedCart = addToCartUtil(cart, newItem);

    expect(updatedCart).toEqual([newItem]);
  });

  it("does not add a duplicate item", () => {
    const cart: CartItem[] = [
      {
        id: "1",
        name: "Phone",
        price: 500,
        imageUrl: "url",
        selectedColor: "Black",
        selectedStorage: "128GB",
        quantity: 1,
      },
    ];
    const duplicateItem: CartItem = {
      id: "1",
      name: "Phone",
      price: 500,
      imageUrl: "url",
      selectedColor: "Black",
      selectedStorage: "128GB",
      quantity: 1,
    };

    const updatedCart = addToCartUtil(cart, duplicateItem);

    expect(updatedCart).toEqual(cart);
  });

  it("adds a new item if it has a different color or storage", () => {
    const cart: CartItem[] = [
      {
        id: "1",
        name: "Phone",
        price: 500,
        imageUrl: "url",
        selectedColor: "Black",
        selectedStorage: "128GB",
        quantity: 1,
      },
    ];
    const newItem: CartItem = {
      id: "1",
      name: "Phone",
      price: 500,
      imageUrl: "url",
      selectedColor: "White",
      selectedStorage: "128GB",
      quantity: 1,
    };

    const updatedCart = addToCartUtil(cart, newItem);

    expect(updatedCart).toEqual([...cart, newItem]);
  });
});
