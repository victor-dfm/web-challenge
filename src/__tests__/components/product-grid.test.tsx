import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductGrid from "@/components/product-grid/product-grid";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

const mockProducts = [
  {
    id: "1",
    brand: "Apple",
    name: "iPhone 14",
    basePrice: 999,
    imageUrl: "/images/iphone14.jpg",
  },
  {
    id: "2",
    brand: "Samsung",
    name: "Galaxy S22",
    basePrice: 899,
    imageUrl: "/images/galaxyS22.jpg",
  },
];

describe("ProductGrid Component", () => {
  it("renders loading state when isLoading is true", () => {
    render(<ProductGrid products={[]} isLoading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders products correctly", () => {
    render(
      <MemoryRouterProvider>
        <ProductGrid products={mockProducts} isLoading={false} />
      </MemoryRouterProvider>,
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.brand)).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`${product.basePrice} EUR`)).toBeInTheDocument();
    });
  });

  it("renders correct links for products", () => {
    render(
      <MemoryRouterProvider>
        <ProductGrid products={mockProducts} isLoading={false} />
      </MemoryRouterProvider>,
    );

    mockProducts.forEach((product) => {
      const productLink = screen.getByRole("link", {
        name: new RegExp(product.name, "i"),
      });

      expect(productLink).toHaveAttribute("href", `/products/${product.id}`);
    });
  });

  it("renders images correctly", () => {
    render(
      <MemoryRouterProvider>
        <ProductGrid products={mockProducts} isLoading={false} />
      </MemoryRouterProvider>,
    );

    mockProducts.forEach((product) => {
      const image = screen.getByAltText(product.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", product.imageUrl);
    });
  });
});
