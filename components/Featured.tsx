/* eslint-disable @next/next/no-img-element */
'use client'
import { useContext } from "react";
import { CartIcon } from "./icons";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import CartButton from "./CartButton";

interface props {
  _id: string;
  title: string;
  description: string;
}

const Featured = ({ product }: {product:props}) => {
  const {addProduct} = useContext(CartContext)

  const addFeaturedToCart = () => {
    addProduct(product._id);
  };
  return (
    <div className="bg-primary-800 text-white py-8">
      <div className="nav-center">
        <div className="grid grid-cols-2 gap-8">
          <div className="grid-column">
            <div>
              <h1>{product?.title}</h1>
              <p className="description">{product?.description}</p>
              <div className="flex gap-2 mt-6">
                <Link href={'/products'+product?._id} className="btn-primary1 py-2 btn_white_Outline px-4" >
                  Read more
                </Link>
                {/* <button onClick={addFeaturedToCart} className="btn-primary1 btn_white_noOutline px-4 py-2" >
                  <CartIcon className="fill-black size-5 mr-1"/>
                  Add to cart
                </button> */}
                <CartButton fill={"fill-black size-5"} productId = {product._id} btnType={"btn_white_noOutline "}/>
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
  );
};

export default Featured;



// import styled from "styled-components";
// import Center from "./Center";
// import Button from "./Button";
// import ButtonLink from "./ButtonLink";
// const Bg = styled.div`
//   background-color: #222;
//   color: #fff;
//   padding: 30px 0;
// `;

// const Title = styled.h1`
//   margin: 0;
//   font-weight: normal;
//   font-size: 3rem;
// `;

// const Desc = styled.p`
//   color: #aaa;
//   font-size: 0.8rem;
// `;

// const ColumnWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1.1fr 0.9fr;
//   gap: 40px;
//   img {
//     max-width: 90%;
//   }
// `;

// const Column = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 25px;
// `;
