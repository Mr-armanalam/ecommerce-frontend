/* eslint-disable @next/next/no-img-element */
"use client";
import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
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
    max-width: 100%;
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
  const ProductData = JSON.parse(product);
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{ProductData?.title}</Title>
              <Desc>{ProductData?.description}</Desc>
              <ButtonWrapper>
                <ButtonLink href={'/products'+product?._id} outline={1} white={1}>
                  Read more
                </ButtonLink>
                <Button primary={1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
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
