'use client';
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ContextProps {
  wishlistProduct: string[];
  clearWishlist: () => void;
  setWishlistProduct?: (wishlistProduct: string) => void;
  addToWishlist: (product: string) => void;
  removeFromWishlist: (productId: string) => void;
}

export const WishlistContext = createContext<ContextProps>({
  clearWishlist: () => {},
  wishlistProduct: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistProvider = ({children}:{children:ReactNode})=> {
    const [wishlistProduct, setWishlistProduct] = useState<string[]>([]);
    const router = useRouter();
  
    useEffect(() => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistProduct(wishlist);
    }, []);
  
    useEffect(() => {
      if (wishlistProduct.length > 0) {
        localStorage.setItem("wishlist", JSON.stringify(wishlistProduct));
      }else{
        localStorage.removeItem("wishlist");
      }
    }, [wishlistProduct]);
  
    function addToWishlist(productId: string) {
      if (wishlistProduct.includes(productId)) {
        removeFromWishlist(productId);
        return;
      }else{
        setWishlistProduct((prev) => [...prev, productId]);
      }
    }
  
    function removeFromWishlist(productId: string) {
      setWishlistProduct((prev) => {
        const position = prev.indexOf(productId);
        if (position !== -1) {
          return prev.filter((_, index) => index !== position);
        }else {
          return prev;
        }
      });
    }
  
    function clearWishlist () {      
      localStorage.removeItem("wishlist");
      setWishlistProduct([]); 
      router.push('/products');
    }
  return (
    <WishlistContext.Provider value={{wishlistProduct, clearWishlist, addToWishlist, removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  return useContext(WishlistContext);
}