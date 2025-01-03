import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata:Metadata = {
  title: "QuirkCart | Product",
  description: "All Products",
};

const ProductsLayout = ({children}:{children:ReactNode}) => {
  return (
    <>{children}</>
  )
}

export default ProductsLayout