import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "QuirkCart",
  description: "Do you need something, Let's buy together",
  applicationName: "QuirkCart",
  keywords: [
    "Quirkcart",
    "QuirkCart",
    "quirkcart",
    "quirk cart",
    "quirkcart ecommerce website",
    "quirkcart store",
  ],
  creator: "Arman Alam",
  icons: "qlogo.svg",
};

const Layout = ({children}: {children:ReactNode}) => {
  return (
    <>
    {children}
    </>
  );
};

export default Layout;
