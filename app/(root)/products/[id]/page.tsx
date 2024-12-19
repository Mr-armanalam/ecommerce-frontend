
import CartButton from "@/components/CartButton";
import ProductImages from "@/components/ProductImages";
import { productDatails } from "@/lib/action/productDetails.action";
import React from "react";

type Params = Promise<{ id: string }>;
const ProductDetails = async (props: { params: Params }) => {
  const params = await props.params;
  const {product} = await productDatails(params.id);
  
  return (
  <div className="nav-center">
    <div className="grid grid-cols-5 gap-10 mt-10">
      <div className="bg-white col-span-2 p-10 center rounded-md">
      <ProductImages images={product.images} />
      </div>
      <div className="col-span-3 ">
        <h2 className="font-bold">{product.title}</h2>
        <p className="text-sm font-medium text-gray-700">{product.description}</p>
        <p className="text-2xl mt-4 font-bold text-gray-700">${product.price}</p>
        <CartButton productId = {product._id} btnType={"btn_primary_noOutline mt-5 "}/>
      </div>
    </div>
  </div>
  );
};

export default ProductDetails;
