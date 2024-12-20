import CartButton from "@/components/client/CartButton";
import {ProductPropertes} from "@/components/client/ProductComponent";
import ProductImages from "@/components/ProductImages";
import { productDatails } from "@/lib/action/productDetails.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shopnest | Products-Details",
  description: "Products Details",
};

type Params = Promise<{ id: string }>;
const ProductDetails = async (props: { params: Params }) => {
  const params = await props.params;
  const { product } = await productDatails(params.id);

  return (
    <div className="nav-center">
      <div className="grid grid-cols-5 gap-10 mt-10">
        <div className="bg-white col-span-2 p-10 center rounded-md">
          <ProductImages images={product.images} />
        </div>
        <div className="col-span-3 ">
          <h2 className="font-bold">{product.title}</h2>
          <p className="text-sm font-medium text-gray-700">
            {product.description}
          </p>
          <h3 className="mt-4 font-bold text-gray-700 text-lg">Details</h3>
          {product?.properties && <ProductPropertes properties={product?.properties} />}
          <p className="text-2xl mt-4 font-bold text-gray-700">
            ${product.price}
          </p>
          <CartButton
            productId={product._id}
            btnType={"btn_primary_noOutline mt-5 "}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
