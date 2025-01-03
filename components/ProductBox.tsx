"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./client/CartButton";
import { WishlistIcon } from "./icons";
import { useWishlist } from "@/context/WishlistContext";

interface props {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  keys?: number;
}

const ProductBox = ({ _id, title, price, images }: props) => {
  const url = `/products/${_id}`;
  const [isHover, setIsHover] = useState(false);
  const { addToWishlist, wishlistProduct } = useWishlist();
  const [iswishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    if (wishlistProduct.length > 0) {
      const found = wishlistProduct.find((product) => product === _id);
      if (found) {
        setIsWishlist(true);
      } else {
        setIsWishlist(false);
      }
    }
  }, [wishlistProduct]);

  return (
    <div className="relative">
      <div
        className={`flex h-[150px] items-center justify-center rounded-md bg-white p-5 ${isHover && "shadow-lg"}`}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`absolute right-2 top-2 z-10 cursor-pointer text-gray-500 ${isHover || iswishlist ? "block" : "hidden"}`}
          onClick={() => addToWishlist(_id)}
        >
          <WishlistIcon
            className={`size-5 active:fill-black ${iswishlist && "fill-gray-700"}`}
          />
        </div>

        <Link href={url}>
          <img
            src={images[0]}
            alt="new product"
            className="max-h-[100px] max-w-[100%]"
          />
        </Link>
      </div>

      <div className="mt-1.5">
        <Link className="text-[0.9rem] font-medium text-primary-850" href={url}>
          {title}
        </Link>
        <div className="mt-0.5 flex items-center justify-between">
          <div className="text-[1.2rem] font-bold">${price}</div>
          <CartButton
            icon={false}
            productId={_id}
            btnType="btn_primary_Outline rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBox;

// import styled from "styled-components";
// import Button from "./Button";
// const ProductWrapper = styled.div``;
// const WhiteBox = styled(Link)`
//   background-color: #fff;
//   padding: 20px;
//   height: 150px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   img {
//     max-width: 100%;
//     max-height: 100px;
//   }
// `;
// const Title = styled(Link)`
//   font-size: 0.9rem;
//   font-weight: 500;
//   color: #333;
// `;
// const ProductInfoBox = styled.div`
//   margin-top: 5px;
// `;
// const PriceRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 2px;
// `;
// const Price = styled.div`
//   font-size: 1.2rem;
//   font-weight: bold;
// `;
