import { Product } from "@/model/product";
import { mongooseConnect } from "../mongoose";

export const productDatails = async (Id:string) => {
  await mongooseConnect();

  const products = await Product.findById(Id);
  const product = JSON.parse(JSON.stringify(products));
  return { product }
};
