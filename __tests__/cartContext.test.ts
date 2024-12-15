import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

interface TestsComponentProps {
  testAddToCart?: boolean;
  testRemoveFromCart?: boolean;
}

const TestComponent: React.FC<TestsComponentProps> = ({
  testAddToCart,
  testRemoveFromCart,
}) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: "SGS-20",
      name: "Galaxy",
      price: 650,
      imageUrl: "test-image.jpg",
      selectedColor: "Black",
      selectedStorage: "128GB",
      quantity: 1,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart("SGS-20");
  };

  return React.createElement(
    "div",
    {},
    React.createElement(
      "p",
      { "data-testid": "cart-count" },
      `Cart Items: ${cart.length}`,
    ),
    React.createElement(
      "p",
      { "data-testid": "cart-content" },
      JSON.stringify(cart),
    ),
    testAddToCart &&
      React.createElement(
        "button",
        { onClick: handleAddToCart, "data-testid": "add-to-cart-button" },
        "Add to Cart",
      ),
    testRemoveFromCart &&
      React.createElement(
        "button",
        {
          onClick: handleRemoveFromCart,
          "data-testid": "remove-from-cart-button",
        },
        "Remove from Cart",
      ),
  );
};

describe("CartProvider", () => {
  it("adds an item to the cart", () => {
    render(
      React.createElement(
        CartProvider,
        null,
        React.createElement(TestComponent, { testAddToCart: true }),
      ),
    );

    const cartCount = screen.getByTestId("cart-count");
    expect(cartCount).toHaveTextContent("Cart Items: 0");

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    fireEvent.click(addToCartButton);

    expect(cartCount).toHaveTextContent("Cart Items: 1");
    expect(screen.getByTestId("cart-content")).toHaveTextContent(
      '[{"id":"SGS-20","name":"Galaxy","price":650,"imageUrl":"test-image.jpg","selectedColor":"Black","selectedStorage":"128GB","quantity":1}]',
    );
  });

  it("removes an item to the cart", () => {
    render(
      React.createElement(
        CartProvider,
        null,
        React.createElement(TestComponent, {
          testAddToCart: true,
          testRemoveFromCart: true,
        }),
      ),
    );

    const cartCount = screen.getByTestId("cart-count");
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    const removeFromCartButton = screen.getByTestId("remove-from-cart-button");

    fireEvent.click(addToCartButton);
    expect(cartCount).toHaveTextContent("Cart Items: 1");

    fireEvent.click(removeFromCartButton);
    expect(cartCount).toHaveTextContent("Cart Items: 0");
  });
});
