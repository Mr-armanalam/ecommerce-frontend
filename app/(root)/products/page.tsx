import ProductBox from "@/components/ProductBox";
import { getAllProducts } from "@/lib/action/allProducts.action";
import { Metadata } from "next";
import React from "react";


export const metadata:Metadata = {
  title: "QuirkCart | Product",
  description: "All Products",
};

const Products = async () => {
  const products = await getAllProducts();
  
  return (
    <>
      <div className="nav-center">
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
