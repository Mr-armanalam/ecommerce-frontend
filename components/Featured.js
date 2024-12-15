/* eslint-disable @next/next/no-img-element */
"use client";
import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { CartIcon } from "./icons";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 30px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 90%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({ product }) => {
  // const ProductData = JSON.parse(product);
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonWrapper>
                <ButtonLink href={'/products'+product?._id} outline={1} white={1}>
                  Read more
                </ButtonLink>
                <Button white={1}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <div>
              <img
                src="https://res.cloudinary.com/dfdgzoi7t/image/upload/v1734252785/product_1734252762572.webp"
                alt="home product"
              />
            </div>
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
