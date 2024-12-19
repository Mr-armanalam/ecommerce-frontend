'use client'
import React, { useContext } from "react";
import { CartIcon } from "./icons";
import { CartContext } from "@/context/CartContext";

interface IcartButton {
  productId: string;
  btnType: string; 
  fill?: string ;
  icon?: boolean;
}

const CartButton = ({btnType, productId, icon=true, fill}:IcartButton) => {
   const {addProduct} = useContext(CartContext);
  return (
    <button onClick={() => addProduct(productId)} className={`btn-primary1 ${btnType} px-5 py-1.5`}>
      {icon &&
        (<>
          <CartIcon className={fill}/> &nbsp; 
        </>)
        }
        Add to cart
    </button>
  );
};

export default CartButton;
