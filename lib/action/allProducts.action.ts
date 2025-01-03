/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/model/product";
import { mongooseConnect } from "../mongoose";

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    await mongooseConnect();
    const products = await Product.find({});
    return JSON.parse(JSON.stringify(products));
  } catch (error: any) {
    console.log(error.message);
    return []; 
  }
}
