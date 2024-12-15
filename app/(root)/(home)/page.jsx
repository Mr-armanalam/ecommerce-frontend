import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/product";
import React from "react";

const Home = ({ product }) => {
  console.log(product);
  
  return (
    <div className="">
      <Header />
      <Featured />
    </div>
  );
};

export default Home;

// export async function getServerSideProps() {
//   const featuredProductId = "675d60ac6c792646c91f64ff";
//   await mongooseConnect();
//   const product = await Product.findById(featuredProductId);
//   return {
//     props: {product},
//   };
// }
