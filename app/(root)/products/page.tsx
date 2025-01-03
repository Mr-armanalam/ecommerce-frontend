'use client'
import Searchbar from "@/components/client/Searchbar";
import ProductBox from "@/components/ProductBox";
import { getAllProducts } from "@/lib/action/allProducts.action";
import React, { useEffect } from "react";

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
  const handleGetAllProducts = async () => {
    const fetchedProducts = await getAllProducts();
    setProducts(fetchedProducts);
  }
  useEffect (() => {
    handleGetAllProducts();
  },[])
  
  return (
    <>
      <div className="nav-center">
        <Searchbar />
        <h2 className="text-[1.5em] font-bold">All products</h2>
        <div className="grid-product mb-8">
          {products?.length > 0 && products.map((product, index) =>(
            <ProductBox key={index} {...product} />
          ))} 
        </div>
      </div>
    </>
  );
};

export default Products;
