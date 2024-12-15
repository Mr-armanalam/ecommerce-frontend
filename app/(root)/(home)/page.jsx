import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import React from "react";

const Home = async () => {
  const {product} = await getFeaturedProduct();
  const ProductData  = JSON.stringify(product);
  return (
    <div className="">
      <Header />
      <Featured product= {ProductData} />
      <NewProducts />
    </div>
  );
};

export default Home;

export async function getFeaturedProduct() {
  const featuredProductId = "675d60ac6c792646c91f64ff";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);  
  return {product};
}
