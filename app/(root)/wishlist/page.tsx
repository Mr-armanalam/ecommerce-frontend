'use client';
import ProductBox from "@/components/ProductBox";
import { useWishlist } from "@/context/WishlistContext";
import { getWishlistProducts } from "@/lib/action/products.action";
import React, { useEffect, useState } from "react";


interface props {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  key?: number;
}

const Wishlist = () => {
  const { wishlistProduct } = useWishlist();
  const [products, setProducts] = useState<props[]>([])

  async function handleWishlist(product: string[]) {
    const WishProducts = await getWishlistProducts(product);
    setProducts(WishProducts);    
  }
  useEffect(() =>{
    if (wishlistProduct?.length > 0){      
      handleWishlist(wishlistProduct);
    }
  },[wishlistProduct])
  
  return (
    <>
      <div className="nav-center">
        <h2 className="text-[1.5em] font-bold">Your WishList</h2>
        <div className="grid-product mb-8">
          {products?.length > 0 &&
            products.map((product, index) => (
              <ProductBox key = {index} {...product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
