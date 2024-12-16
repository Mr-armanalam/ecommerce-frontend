/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";


const ProductBox = ({ _id, title, description, price, images }) => {
  const url = `/product/${_id}`
  return (
    <div>
      <Link className="bg-white p-5 h-[150px] flex items-center justify-center rounded-md"  href={url}>
        <img src={images[0]} alt="new product" className="max-w-[100%] max-h-[100px]" />
      </Link>
      <div className="mt-1.5">
        <Link className="text-[0.9rem] font-medium text-primary-850" href={url}>{title}</Link>
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-[1.2rem] font-bold">${price}</div>
          <button className="btn-primary1 btn_primary_Outline">
            Add to cart
          </button>
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