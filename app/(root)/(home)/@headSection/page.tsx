import { getFeaturedProduct } from "@/components/server/products.action";
import Featured from "@/components/Featured";
import React from "react";

const page = async () => {
  const { featuredProduct } = await getFeaturedProduct();
  return <Featured product={featuredProduct} />;
};

export default page;
