import { Metadata } from "next";
import React, { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "QuirkCart | Product",
  description: "All Products",
};

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default ProductsLayout;
