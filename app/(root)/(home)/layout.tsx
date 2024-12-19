import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata:Metadata = {
  title: "Shopnest | Home",
  description: "New Arrival | Products",
};

const Layout = ({
  headSection,
  newProducts,
}: {
  headSection: ReactNode,
  newProducts: ReactNode,
}) => {
  return (
    <div>
      {headSection}
      {newProducts}
    </div>
  );
};

export default Layout;
