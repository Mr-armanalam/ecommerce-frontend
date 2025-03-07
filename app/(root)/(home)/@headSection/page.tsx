import { getFeaturedProduct } from "@/components/server/products.action";
// import Featured from "@/components/Featured";
import React from "react";
import { FeaturedProduct } from "./FeaturedProduct";

const page = async () => {
  const { featuredProduct } = await getFeaturedProduct();
  return <FeaturedProduct featuredProduct={featuredProduct?.TrndProduct} />;
  // return <Featured product={featuredProduct} />;
};

export default page;
