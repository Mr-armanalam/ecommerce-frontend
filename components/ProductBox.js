/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;

const Title = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;


const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const url = `/product/${_id}`
  return (
    <ProductWrapper>
      <WhiteBox  href={url}>
        <img src={images[0]} alt="new product" />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary={1} outline={1}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
