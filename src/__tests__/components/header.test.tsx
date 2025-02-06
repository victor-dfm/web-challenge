import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/header/header";
import { CartProvider } from "@/context/cart-context";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("header Component", () => {
  it("renders the logo", () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    expect(screen.getByText("WebChallengeLogo")).toBeInTheDocument();
  });

  it("renders the cart icon", () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    expect(screen.getByLabelText("Go to cart")).toBeInTheDocument();
  });

  it("displays correct cart count", () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-counter")).toHaveTextContent("0");
  });

  it("shows filled cart icon when on the cart page", () => {
    (usePathname as jest.Mock).mockReturnValue("/cart");

    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-icon-filled")).toBeInTheDocument();
  });

  it("shows empty cart icon when not on the cart page", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-icon-empty")).toBeInTheDocument();
  });
});
