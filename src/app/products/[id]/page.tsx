"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
import "../../../styles/Product.css";
import { useCart } from "@/context/CartContext";
import { SlArrowLeft } from "react-icons/sl";

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

export default function ProductDetails() {
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
    <div className="container">
      <div className="backButtonContainer">
        <Link href="/">
          <button className="backButton">
            <SlArrowLeft className="icon" /> BACK
          </button>
        </Link>
      </div>

      <div className="mainContainer">
        <div className="imageContainer">
          <img src={selectedImage?.imageUrl} alt={product.name} />
        </div>

        <div className="infoProductContainer">
          <div className="infoProduct">
            <p className="productTitle">{product.name}</p>
            <p className="productPrice">From {selectedStorage?.price} EUR</p>
          </div>

          <div className="storageOptions">
            <p className="sectionTitle">Storage, HOW MUCH SPACE DO YOU NEED?</p>
            <div className="optionsStorageGrid">
              {product.storageOptions.map((option, index) => (
                <button
                  key={index}
                  className={`storageOptionButton ${selectedStorage?.capacity === option.capacity ? "selected" : ""}`}
                  onClick={() => setSelectedStorage(option)}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>

          <div className="colorOptions">
            <p className="sectionTitle">Color, pick your favourite</p>
            <div className={"optionsColorsGrid"}>
              {product.colorOptions.map((option) => (
                <button
                  key={option.name}
                  className={`colorOption ${selectedImage?.name === option.name ? "selected" : ""}`}
                  style={{ backgroundColor: option.hexCode }}
                  onClick={() => setSelectedImage(option)}
                  title={option.name}
                />
              ))}
            </div>
            <p className="productColor">{selectedImage?.name}</p>
          </div>

          <button
            className={`addButton ${isAddToCartEnabled ? "" : "disabled"}`}
            onClick={handleAddToCart}
            disabled={!isAddToCartEnabled}
          >
            AÑADIR
          </button>
        </div>
      </div>

      <div className="specificationsContainer">
        <p className="specificationsTitle">Specifications</p>
        <div className="specRow">
          <span className="specKey">brand</span>
          <span className="specValue">{product.brand}</span>
        </div>
        <div className="specRow">
          <span className="specKey">name</span>
          <span className="specValue">{product.name}</span>
        </div>
        <div className="specRow">
          <span className="specKey">description</span>
          <span className="specValue">{product.description}</span>
        </div>
        {product.specs &&
          Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="specRow">
              <span className="specKey">{key}</span>
              <span className="specValue">{String(value)}</span>
            </div>
          ))}
      </div>

      <div className="similarProductsContainer">
        <p className="similarProductsTitle">Similar products</p>
        <div className="similarProducts">
          {product.similarProducts.map((similarProduct, index) => (
            <Link
              key={`${similarProduct.id}-${index}`}
              href={`/products/${similarProduct.id}`}
              passHref
            >
              <div
                className="scrollItem"
                key={`${product.id}-${similarProduct.id}-${index}`}
              >
                <div className="card">
                  <div className="overlay" />
                  <div className="imageContainer">
                    <img
                      src={similarProduct.imageUrl}
                      alt={similarProduct.name}
                    />
                  </div>

                  <div className="infoContainer">
                    <p className="brand">{similarProduct.brand}</p>

                    <div className="bottomInfo">
                      <p className="model">{similarProduct.name}</p>
                      <p className="price">{similarProduct.basePrice} EUR</p>
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
