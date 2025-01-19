import CartButton from "@/components/client/CartButton";
import { ProductPropertes } from "@/components/client/ProductComponent";
import ReviewShower from "@/components/client/ReviewShower";
import ProductImages from "@/components/ProductImages";
import { productDatails } from "@/lib/action/productDetails.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "QuirkCart | Products-Details",
  description: "Products Details",
};

type Params = Promise<{ id: string }>;
const ProductDetails = async (props: { params: Params }) => {
  const params = await props.params;
  const { product } = await productDatails(params.id);

  return (
    <div className="nav-center">
      <div className="my-10 grid grid-cols-5 max-sm:grid-cols-1 md:gap-5 lg:gap-10">
        <div className="center col-span-2 rounded-md bg-white p-10">
          <ProductImages images={product.images} />
        </div>
        <div className="col-span-3 max-sm:pb-4">
          <h2 className="font-bold">{product.title}</h2>
          <p className="text-sm font-medium text-gray-700">
            {product.description}
          </p>
          <h3 className="mt-4 text-lg font-bold text-gray-700">Details</h3>
          {product?.properties && (
            <ProductPropertes properties={product?.properties} />
          )}
          <p className="mt-4 text-2xl font-bold text-gray-700">
            ${product.price}
          </p>
          <CartButton
            productId={product._id}
            btnType={"btn_primary_noOutline mt-5 "}
          />
        </div>
      </div>
      <ReviewShower />
    </div>
  );
};

export default ProductDetails;
