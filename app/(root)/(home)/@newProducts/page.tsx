/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductBox from "@/components/ProductBox";
import { getFeaturedProduct } from "@/lib/action/products.action";
import React from "react";

const page = async () => {  
  const { newProducts: product } = await getFeaturedProduct();

  return (
    <div className="nav-center">
      <h2>New Arrivals</h2>
      <div className="grid grid-cols-5 max-sm:grid-cols-2 max-md:grid-cols-3 gap-5 pb-3">
        {product.length > 0 &&
          product.map((p:any, index: number) => <ProductBox key={index} {...p} />)}
      </div>
    </div>
  );
};

export default page;
