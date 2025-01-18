/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CartButton from "@/components/client/CartButton";
import { ProductPropertes } from "@/components/client/ProductComponent";
import { getAllProducts } from "@/lib/action/allProducts.action";
import { allProductsByCategory } from "@/lib/action/getAllProductsByCatg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Categories = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("ct");

  const [products, setProducts] = React.useState<any[]>([]);
  useEffect(() => {
    if (searchQuery) {
      (async () => {
        const fetchedProduct: any = await allProductsByCategory(searchQuery);
        if (fetchedProduct?.length > 0) {
          setProducts(JSON.parse(fetchedProduct));
        }
      })();
    } else {
      (async () => {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      })();
    }
  }, [searchParams, searchQuery]);

  return (
    <>
      <div className="pb-8">
        {products?.length > 0 &&
          products.map((product: any, i) => (
            <div key={i} className="nav-center">
              <div className="mt-10 grid grid-cols-5 max-sm:grid-cols-1 md:gap-5 lg:gap-10">
                <div className="center col-span-2 rounded-md bg-white p-10">
                  <Image
                    src={product.images[0]}
                    alt="product"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="col-span-3 max-sm:pb-4">
                  <p className="py-4 text-4xl font-bold text-gray-800">
                    {product.title}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {product.description}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-gray-700">
                    Details
                  </h3>
                  {product?.properties && (
                    <ProductPropertes properties={product?.properties} />
                  )}
                  <div className="mt-4 flex items-center font-bold text-gray-600">
                    <p className="mr-4 rounded-md border-2 border-gray-400 px-8 py-0.5 text-2xl">
                      ${product.price}
                    </p>
                    <CartButton
                      productId={product._id}
                      btnType={"btn_primary_noOutline"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Categories;

// adminUser: id
// category: id
// description: string
// images: array of string
// price: number
// properties: object
// sells: number
// title: string
// totalItem:number
// updatedAt: date
// _id
