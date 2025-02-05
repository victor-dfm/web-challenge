import React, { memo } from "react";
import Link from "next/link";

import styles from "./ProductGrid.module.css";

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
    <div className={styles.grid}>
      {products.map((product, index) => (
        <Link
          key={`${product.id}-${index}`}
          href={`/products/${product.id}`}
          passHref
        >
          <div className={styles.card}>
            <div className={styles.overlay} />
            <div className={styles.imageContainer}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.image}
              />
            </div>

            <div className={styles.infoContainer}>
              <p className={styles.brand}>{product.brand}</p>

              <div className={styles.bottomInfo}>
                <p className={styles.model}>{product.name}</p>
                <p className={styles.price}>{product.basePrice} EUR</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default memo(ProductGrid);
