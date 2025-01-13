/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { AdminUser } from "@/model/adminUser.model";
import { mongooseConnect } from "../mongoose";
import { Product } from "@/model/product";

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}

export async function searchProducts (params: SearchParams) {
  try {
    await mongooseConnect();
    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };
    const productQuery: any = {
      $or: [{ title: regexQuery }, { description: regexQuery }],
    };

    let productResults = [];
    if (type === "admin") {
      const matchingAdminUsers = await AdminUser.find({
        name: regexQuery,
      });
      const adminUserIds = matchingAdminUsers.map((admin) => admin._id);
      productResults = await Product.find({ adminUser: { $in: adminUserIds } });
    } else {
      productResults = await Product.find(productQuery);
    }

    const Results = productResults.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images,
      category: product.category,
      properties: product.properties,
      sells: product.sells,
      totalItem: product.totalItem,
      id: product._id,
    }));

    return JSON.stringify(Results);
  } catch (error) {
    console.log(`Error fetching search results: ${error}`);
    throw error;
  }
}

// if (type === "admin") {
//   const matchingAdminUsers = await AdminUser.find({
//     name: regexQuery,
//   });
//   const adminUserIds = matchingAdminUsers.map((admin) => admin._id);
//   productQuery.adminUser = { $in: adminUserIds };
// }

// const productResults = await Product.find(productQuery);
// console.log(productQuery);
