import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import React from "react";

const Home = async () => {
  const {featuredProduct, newProducts} = await getFeaturedProduct();  
  
  return (
    <div className="">
      <Header />
      <Featured product= {featuredProduct} />
      <NewProducts product={newProducts} />
    </div>
  );
};

export default Home;

export async function getFeaturedProduct() {
  const featuredProductId = "675d60ac6c792646c91f64ff";
  await mongooseConnect();
  const featuredProductData = await Product.findById(featuredProductId);  
  const newProduct = await Product.find({}, null, {sort: {'_id': -1}, limit: 10})
  
  return {
    featuredProduct : JSON.parse(JSON.stringify(featuredProductData)),
    newProducts : JSON.parse(JSON.stringify(newProduct))
  };
}
