import { Product } from "@/model/product";
import { mongooseConnect } from "../mongoose";

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface IProducts {
  products: IProduct[];
}

export const getAllProducts = async (): Promise<IProducts> => {
  try {
    await mongooseConnect();
    const products = await Product.find({});
    return { products: JSON.parse(JSON.stringify(products)) };
  } catch (error: any) {
    console.log(error.message);
    return { products: [] }; 
  }
}
