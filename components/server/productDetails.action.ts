/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Iproduct, Product } from "@/model/product";
import { mongooseConnect } from "../../lib/mongoose";

export const productDatails = async (Id: string) => {
  try {
    await mongooseConnect();

    const products: Iproduct | null = await Product.findById(Id);
    const product = JSON.parse(JSON.stringify(products));
    return product;
  } catch (error: any) {
    console.log(error.message);
  }
};
