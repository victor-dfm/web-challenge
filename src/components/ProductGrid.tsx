import React, { memo } from "react";
import Link from "next/link";
import "../styles/ProductGird.css";

interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid">
      {products.map((product, index) => (
        <Link
          key={`${product.id}-${index}`}
          href={`/products/${product.id}`}
          passHref
        >
          <div className="card">
            <div className="overlay" />
            <div className="imageContainer">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="image"
              />
            </div>

            <div className="infoContainer">
              <p className="brand">{product.brand}</p>

              <div className="bottomInfo">
                <p className="model">{product.name}</p>
                <p className="price">{product.basePrice} EUR</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default memo(ProductGrid);
