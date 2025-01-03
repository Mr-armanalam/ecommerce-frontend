'use client';
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ContextProps {
  wishlistProduct: string[];
  clearCart: () => void;
  setWishlistProduct?: (wishlistProduct: string) => void;
  addToWishlist: (product: string) => void;
  removeFromWishlist: (productId: string) => void;
}

export const WishlistContext = createContext<ContextProps>({
  clearCart: () => {},
  wishlistProduct: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistProvider = ({children}:{children:ReactNode})=> {
    const [wishlistProduct, setWishlistProduct] = useState<string[]>([]);
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistProduct(storedCart);
    }, []);
  
    useEffect(() => {
      if (wishlistProduct.length > 0) {
        localStorage.setItem("wishlist", JSON.stringify(wishlistProduct));
      }
    }, [wishlistProduct]);
  
    function addToWishlist(productId: string) {
      setWishlistProduct((prev) => [...prev, productId]);
    }
  
    function removeFromWishlist(productId: string) {
      setWishlistProduct((prev) => {
        const position = prev.indexOf(productId);
        if (position !== -1) {
          return prev.filter((_, index) => index !== position);
        } else {
          return prev;
        }
      });
    }
  
    function clearCart () {
      setWishlistProduct([]);
    }
  return (
    <WishlistContext.Provider value={{wishlistProduct, clearCart, addToWishlist, removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContext;