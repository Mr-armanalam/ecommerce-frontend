'use client'
import { createContext, ReactNode, useState } from "react";


interface CreateContextType {
  cartProducts: any[];
  setCartProducts: (cartProducts: any[]) => void;
  addProduct: (productId: string) => void;  
}
export const CartContext = createContext<CreateContextType | undefined >(undefined);

export function CartContextProvider({children}: {children: ReactNode}) {
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  function addProduct(productId: string) {
    setCartProducts(prev => [...prev, productId]);
  }
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}