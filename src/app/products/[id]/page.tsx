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

interface ImageOptions {
  name: string;
  hexCode: string;
  imageUrl: string;
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
  const [selectedImage, setSelectedImage] = useState<ImageOptions | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOptions | null>(
    null,
  );
  const { addToCart } = useCart();

  const isAddToCartEnabled = selectedImage !== null && selectedStorage !== null;

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.colorOptions[0]);
      } catch (e) {
        console.error("Error fetching product: ", e);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (product?.storageOptions?.length) {
      const defaultStorage = product.storageOptions.reduce((min, option) =>
        option.price < min.price ? option : min,
      );
      setSelectedStorage(defaultStorage);
    }
  }, [product]);

  if (!product) return <p>Loading product details...</p>;

  const handleAddToCart = () => {
    if (!isAddToCartEnabled) {
      alert("Please select a storage and a colour.");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      imageUrl: selectedImage.imageUrl,
      selectedColor: selectedImage.name,
      selectedStorage: selectedStorage.capacity,
      price: selectedStorage.price,
      quantity: 1,
    });
  };

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
          <img src={selectedImage?.imageUrl} alt={product.name} />
        </div>

        <div className={styles.infoProductContainer}>
          <div className={styles.infoProduct}>
            <p className={styles.productTitle}>{product.name}</p>
            <p className={styles.productPrice}>
              From {selectedStorage?.price} EUR
            </p>
          </div>

          <div className={styles.storageOption}>
            <p className={styles.sectionTitle}>
              Storage, HOW MUCH SPACE DO YOU NEED?
            </p>
            <div className={styles.optionsStorageGrid}>
              {product.storageOptions.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.storageOptionButton} ${selectedStorage?.capacity === option.capacity ? "selected" : ""}`}
                  onClick={() => setSelectedStorage(option)}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.colorOption}>
            <p className={styles.sectionTitle}>Color, pick your favourite</p>
            <div className={styles.optionsColorsGrid}>
              {product.colorOptions.map((option) => (
                <button
                  key={option.name}
                  className={`${styles.colorOption} ${selectedImage?.name === option.name ? "selected" : ""}`}
                  style={{ backgroundColor: option.hexCode }}
                  onClick={() => setSelectedImage(option)}
                  title={option.name}
                />
              ))}
            </div>
            <p className={styles.productColor}>{selectedImage?.name}</p>
          </div>

          <button
            className={`${styles.addButton} ${isAddToCartEnabled ? "" : "disabled"}`}
            onClick={handleAddToCart}
            disabled={!isAddToCartEnabled}
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
              <div
                className={styles.scrollItem}
                key={`${product.id}-${similarProduct.id}-${index}`}
              >
                <div className={styles.card}>
                  <div className={styles.overlay} />
                  <div className={styles.imageContainer}>
                    <img
                      src={similarProduct.imageUrl}
                      alt={similarProduct.name}
                    />
                  </div>

                  <div className={styles.infoContainer}>
                    <p className={styles.brand}>{similarProduct.brand}</p>

                    <div className={styles.bottomInfo}>
                      <p className={styles.model}>{similarProduct.name}</p>
                      <p className={styles.price}>
                        {similarProduct.basePrice} EUR
                      </p>
                    </div>
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
