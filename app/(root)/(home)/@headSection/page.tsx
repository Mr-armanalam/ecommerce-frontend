import Header from "@/components/Header";
import { CartIcon } from "@/components/icons";
import { getFeaturedProduct } from "@/lib/action/products.action";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { featuredProduct: product } = await getFeaturedProduct();
  return (
    <>
      <Header />
      
      <div className="bg-primary-800 text-white py-8">
        <div className="nav-center">
          <div className="grid grid-cols-2 gap-8">
            <div className="grid-column">
              <div>
                <h1>{product?.title}</h1>
                <p className="description">{product?.description}</p>
                <div className="flex gap-2 mt-6">
                  <Link
                    href={"/products" + product?._id}
                    className="btn-primary1 btn_white_Outline px-4"
                  >
                    Read more
                  </Link>
                  <button className="btn-primary1 btn_white_noOutline px-4 py-2">
                    <CartIcon className="fill-black size-5 mr-1" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className="grid-column">
              <div className="flex pr-10">
                <img
                  src="https://res.cloudinary.com/dfdgzoi7t/image/upload/v1734252785/product_1734252762572.webp"
                  alt="home product"
                  className="w-[85%] ml-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
