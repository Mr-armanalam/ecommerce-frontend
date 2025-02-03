"use client";
import Searchbar from "@/components/client/Searchbar";
import ProductBox from "@/components/ProductBox";
import { getAllProducts } from "@/components/server/allProducts.action";
import { searchProducts } from "@/components/server/getSearchResult.action";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface props {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  key?: number;
}

const Products = () => {
  const [products, setProducts] = React.useState<props[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  const handleGetAllProducts = async () => {
    const fetchedProducts = await getAllProducts();
    setProducts(fetchedProducts);
  };
  const handleSearchProducts = useCallback(async () => {
    const fetchedProducts = await searchProducts({ query: searchQuery });
    setProducts(JSON.parse(fetchedProducts));
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === "") {
      setIsOpen(false);
      handleGetAllProducts();
    } else {
      handleSearchProducts();
    }
  }, [searchQuery, handleSearchProducts]);

  return (
    <>
      <div className="nav-center">
        <Searchbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <h2 className="text-[1.5em] font-bold">All products</h2>
        <div className="grid-product mb-8">
          {products?.length > 0 &&
            products.map((product, index) => (
              <ProductBox key={index} {...product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
