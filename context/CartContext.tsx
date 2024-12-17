"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CreateContextType {
  cartProducts: string[];
  setCartProducts: (cartProducts: any[]) => void;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<CreateContextType | undefined>(
  undefined
);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartProducts(storedCart);
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productId: string) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId: string) {
    setCartProducts((prev) => {
      const position = prev.indexOf(productId);
      if (position !== -1) {
        return prev.filter((_, index) => index !== position);
      } else {
        return prev;
      }
    });
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}