import React, { ReactNode } from "react";

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
