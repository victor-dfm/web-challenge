import { render, act } from "@testing-library/react";
import { CartProvider, useCart, CartItem } from "@/context/cart-context";
import { addToCartUtil } from "@/utils/cart-utils";

jest.mock("@/utils/cart-utils", () => ({
  addToCartUtil: jest.fn((prevCart, newItem) => [...prevCart, newItem]),
}));

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes cart from localStorage", () => {
    const storedCart: CartItem[] = [
      {
        id: "1",
        name: "Product 1",
        price: 100,
        imageUrl: "image1.jpg",
        selectedColor: "Black",
        selectedStorage: "128GB",
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(storedCart));

    let cart: CartItem[] = [];

    function TestComponent() {
      const { cart: contextCart } = useCart();
      cart = contextCart;
      return null;
    }

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(cart).toEqual(storedCart);
  });

  it("adds an item to the cart", () => {
    let cart: CartItem[] = [];
    let addToCart: (item: CartItem) => void;

    function TestComponent() {
      const context = useCart();
      cart = context.cart;
      addToCart = context.addToCart;
      return null;
    }

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const newItem: CartItem = {
      id: "2",
      name: "Product 2",
      price: 200,
      imageUrl: "image2.jpg",
      selectedColor: "Blue",
      selectedStorage: "256GB",
      quantity: 1,
    };

    act(() => {
      addToCart(newItem);
    });

    expect(cart).toContainEqual(newItem);
    expect(addToCartUtil).toHaveBeenCalledWith([], newItem);
  });

  it("removes an item from the cart", () => {
    let cart: CartItem[] = [];
    let addToCart: (item: CartItem) => void;
    let removeFromCart: (id: string) => void;

    function TestComponent() {
      const context = useCart();
      cart = context.cart;
      addToCart = context.addToCart;
      removeFromCart = context.removeFromCart;
      return null;
    }

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const newItem: CartItem = {
      id: "3",
      name: "Product 3",
      price: 300,
      imageUrl: "image3.jpg",
      selectedColor: "Red",
      selectedStorage: "512GB",
      quantity: 1,
    };

    act(() => {
      addToCart(newItem);
    });

    expect(cart).toContainEqual(newItem);

    act(() => {
      removeFromCart("3");
    });

    expect(cart).not.toContainEqual(newItem);
  });

  it("updates localStorage when cart changes", () => {
    let addToCart: (item: CartItem) => void;

    function TestComponent() {
      const context = useCart();
      addToCart = context.addToCart;
      return null;
    }

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const newItem: CartItem = {
      id: "4",
      name: "Product 4",
      price: 400,
      imageUrl: "image4.jpg",
      selectedColor: "Green",
      selectedStorage: "1TB",
      quantity: 1,
    };

    act(() => {
      addToCart(newItem);
    });

    expect(localStorage.getItem("cart")).toEqual(JSON.stringify([newItem]));
  });
});
