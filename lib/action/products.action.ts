/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { Product } from "@/model/product";
import { mongooseConnect } from "../mongoose";
import { Order } from "@/model/Order.model";

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

export async function getCartProduct(productId: string[]) {
  try {    
    await mongooseConnect();
    const product = await Product.find({_id: productId});    
    
    if (!product) {
      console.error("product not found");
      return { products: [] };
    }
    return {product: JSON.parse(JSON.stringify(product))};

  } catch (error: any) {
    console.error(error.message);
    return { products: [] };
  }
}

export async function allOrderItems(clientuser: string){
  try {
    await mongooseConnect();
    const orderItems = await Order.find({clientuser}).populate('products');
    
    if (!orderItems) {
      console.error("Order items not found");
      return { orderItems: [] };
    }
    return {orderItems: JSON.parse(JSON.stringify(orderItems))};
  }
  catch (error: any) {
    console.error(error.message);
    return { orderItems: [] };
  }
}
