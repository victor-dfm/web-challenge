"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import apiClient from "@/utils/apiClient";
import debounce from "lodash/debounce";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

import styles from "./home.module.css";

interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceLoading, setDebounceLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = useCallback(async (search: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/products?search=${search}`);

      console.log("Response: ", response);
      const uniqueProducts = response.data.filter(
        (product: Product, index: number, self: Product[]) =>
          index === self.findIndex((p) => p.id === product.id),
      );

      setProducts(uniqueProducts.slice(0, 20));
    } catch (e) {
      setError(`${e}`);
    } finally {
      setLoading(false);
      setDebounceLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(() => {
    return debounce(async (search: string) => {
      try {
        await fetchProducts(search);
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }, [fetchProducts]);

  useEffect(() => {
    setDebounceLoading(true);
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <SearchInput value={searchTerm} onChange={handleSearchChange} />
      <p className={styles.title}>{products.length} RESULTS</p>
      {debounceLoading ? (
        <div className={styles.loading}>
          <p className={styles.title}>Loading ...</p>
        </div>
      ) : (
        <ProductGrid products={products} isLoading={loading} />
      )}
    </div>
  );
}
