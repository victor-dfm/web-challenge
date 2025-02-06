"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
import { useCart } from "@/context/CartContext";
import { SlArrowLeft } from "react-icons/sl";
import styles from "./productDetails.module.css";

interface ColorOption {
  hexCode: string;
  imageUrl: string;
  name: string;
}

interface SimilarProducts {
  id: string;
  basePrice: number;
  brand: string;
  imageUrl: string;
  name: string;
}

interface Specs {
  battery: string;
  mainCamera: string;
  os: string;
  processor: string;
  resolution: string;
  screen: string;
  screenRefreshRate: string;
  selfieCamera: string;
}

interface StorageOptions {
  capacity: string;
  price: number;
}

interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: string;
  description: string;
  colorOptions: ColorOption[];
  similarProducts: SimilarProducts[];
  specs: Specs[];
  storageOptions: StorageOptions[];
}

export default function Page() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [initialPrice, setInitialPrice] = useState<number | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOptions | null>(
    null,
  );
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);

        if (response.data.storageOptions.length > 0) {
          setInitialPrice(response.data.storageOptions[0].price);
        }

        if (response.data.colorOptions.length > 0) {
          setDefaultImage(response.data.colorOptions[0].imageUrl);
        }
      } catch (e) {
        console.error("Error fetching product: ", e);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (product?.storageOptions?.length > 0) {
      setInitialPrice(product.storageOptions[0].price);
    }
  }, [product]);

  if (!product) return <p>Loading product details...</p>;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) {
      alert("Please select a storage and a colour.");
      return;
    }

    addToCart({
      id: product!.id,
      name: product!.name,
      imageUrl: selectedColor.imageUrl,
      selectedColor: selectedColor.name,
      selectedStorage: selectedStorage.capacity,
      price: selectedStorage.price,
      quantity: 1,
    });
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer}>
        <Link href="/">
          <button className={styles.backButton}>
            <SlArrowLeft /> BACK
          </button>
        </Link>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.imageContainer}>
          <img
            src={selectedColor ? selectedColor.imageUrl : defaultImage!}
            alt={product.name}
          />
        </div>

        <div className={styles.infoProductContainer}>
          <div className={styles.infoProduct}>
            <p className={styles.productTitle}>{product.name}</p>
            <p className={styles.productPrice}>
              From {selectedStorage ? selectedStorage.price : initialPrice} EUR
            </p>
          </div>

          <div className={styles.storageOption}>
            <p className={styles.sectionTitle}>
              STORAGE, HOW MUCH SPACE DO YOU NEED?
            </p>
            <div className={styles.optionsStorageGrid}>
              {product.storageOptions.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.storageOptionButton} ${selectedStorage?.capacity === option.capacity ? styles.selected : ""}`}
                  onClick={() => setSelectedStorage(option)}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.colorOptionsContainer}>
            <p className={styles.sectionTitle}>COLOR. PICK YOUR FAVOURITE.</p>
            <div className={styles.optionsColorsGrid}>
              {product.colorOptions.map((option) => (
                <button
                  key={option.name}
                  className={`${styles.colorOption} ${selectedColor?.name === option.name ? styles.selected : ""}`}
                  style={{ backgroundColor: option.hexCode }}
                  onClick={() => setSelectedColor(option)}
                />
              ))}
            </div>
            {selectedColor && (
              <p className={styles.productColor}>{selectedColor.name}</p>
            )}
          </div>

          <button
            className={`${styles.addButton} ${selectedColor && selectedStorage ? styles.enabled : styles.disabled}`}
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            AÑADIR
          </button>
        </div>
      </div>

      <div className={styles.specsContainer}>
        <p className={styles.specificationsTitle}>Specifications</p>
        <div className={styles.specRow}>
          <span className={styles.specKey}>brand</span>
          <span className={styles.specValue}>{product.brand}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specKey}>name</span>
          <span className={styles.specValue}>{product.name}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specKey}>description</span>
          <span className={styles.specValue}>{product.description}</span>
        </div>
        {product.specs &&
          Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className={styles.specRow}>
              <span className={styles.specKey}>{key}</span>
              <span className={styles.specValue}>{String(value)}</span>
            </div>
          ))}
      </div>

      <div className={styles.similarProductsContainer}>
        <p className={styles.similarProductsTitle}>Similar products</p>
        <div className={styles.similarProducts}>
          {product.similarProducts.map((similarProduct, index) => (
            <Link
              key={`${similarProduct.id}-${index}`}
              href={`/products/${similarProduct.id}`}
              passHref
            >
              <div className={styles.similarProductCard}>
                <div className={styles.overlay} />
                <div className={styles.imageContainer}>
                  <img
                    src={similarProduct.imageUrl}
                    alt={similarProduct.name}
                  />
                </div>

                <div className={styles.productInfo}>
                  <p className={styles.brand}>{similarProduct.brand}</p>

                  <div className={styles.bottomInfo}>
                    <p className={styles.model}>{similarProduct.name}</p>
                    <p className={styles.price}>
                      {similarProduct.basePrice} EUR
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
