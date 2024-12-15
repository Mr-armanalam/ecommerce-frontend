'use client'
import React from 'react'
import styled from 'styled-components'
import Center from './Center';
import ProductBox from './ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 400;
  color: #333;
`;

const NewProducts = ({product}) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {product.length > 0 && product.map((p, index) => (
          <ProductBox key={index} {...p}/>
        ))}
      </ProductsGrid>
    </Center>
  )
}

export default NewProducts