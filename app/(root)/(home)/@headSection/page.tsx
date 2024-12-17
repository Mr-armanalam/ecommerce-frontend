import Header from "@/components/Header";
import { getFeaturedProduct } from "@/lib/action/products.action";
import Featured from "@/components/Featured"
import React from "react";

const page = async () => {
  const { featuredProduct } = await getFeaturedProduct();
  return (
    <>
      {/* <Header /> */}
      <Featured product={featuredProduct} />
    </>
  );
};

export default page;
