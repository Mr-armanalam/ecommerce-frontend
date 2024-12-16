'use server'

import { Product } from "@/model/product";
import { mongooseConnect } from "../mongoose";

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
