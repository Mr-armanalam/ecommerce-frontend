"use client";
import { CartContext } from "@/context/CartContext";
import { getCartProduct } from "@/lib/action/products.action";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { cartProducts , addProduct, removeProduct} = useContext(CartContext) ?? { cartProducts: [] };
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      (async function () {
        const { product } = await getCartProduct(cartProducts);
        setProducts(product);
      })();
    }
  }, [cartProducts]);

  const moreOfThisProduct = (productId: string) => {
    if (addProduct) {
      addProduct(productId);
    }
  }

 
  const lessOfThisProduct = (productId: string) => {
    if (removeProduct) {
      removeProduct(productId);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 nav-center mt-10">
      <div className="bg-white rounded-md col-span-2 p-8">
        <h2>Cart</h2>
        {!cartProducts?.length ? (
          <div>Your cart is empty</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product: any, index) => (
                  <tr key={index}>
                    <td>
                      <div className="w-[100px] h-[100px] p-3 shadow-md border border-gray-100 center rounded-md">
                        <img
                          src={product.images[0]}
                          alt="cart product"
                          className="max-w-[80px] max-h-[80px]"
                        />
                      </div>
                      {product?.title}
                    </td>
                    <td>
                      <button onClick={() => lessOfThisProduct(product._id)} className="bg-gray-400 w-6 rounded text-center text-white pb-0.5 mr-1">
                        -
                      </button>
                      <span className="font-semibold text-gray-500">
                        {cartProducts.filter((id) => id === product._id).length}
                      </span>
                      <button
                        onClick={()=> moreOfThisProduct(product?._id)}
                        className=" bg-gray-400 w-6 rounded text-center text-white pb-0.5 ml-1"
                        type="button"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      {"$" +
                        cartProducts.filter((id) => id === product._id).length *
                          product.price || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {!!cartProducts?.length && (
        <div className="bg-white rounded-md col-auto p-8">
          <h2>Order information</h2>
          <input type="text" placeholder="Address1" />
          <input type="text" placeholder="Address2" />
          <button className="btn-primary1 bg-primary-800 rounded-md text-white btn_block py-2">
            Continue to payment
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
