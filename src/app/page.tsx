"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import apiClient from "@/utils/apiClient";
import debounce from "lodash/debounce";
import SearchInput from "@/components/SearchInput";
import ProductGrid from "@/components/ProductGrid";

import "../styles/Home.css";

interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = useCallback(async (search: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/products?search=${search}`);

      const uniqueProducts = response.data.filter(
        (product: Product, index: number, self: Product[]) =>
          index === self.findIndex((p) => p.id === product.id),
      );

      setProducts(uniqueProducts.slice(0, 20));
    } catch (e) {
      setError(`${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(() => {
    return debounce(async (search: string) => {
      try {
        await fetchProducts(search);
      } catch (e) {
        console.error(e);
      }
    }, 300);
  }, [fetchProducts]);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  if (loading) return <p>Loading the products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <SearchInput value={searchTerm} onChange={handleSearchChange} />
      <p className="title">{products.length} RESULTS</p>
      <ProductGrid products={products} isLoading={loading} />
    </div>
  );
}
