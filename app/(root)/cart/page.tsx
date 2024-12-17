"use client";
import { CartContext } from "@/context/CartContext";
import { getCartProduct } from "@/lib/action/products.action";
import React, { useContext, useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  properties: { [key: string]: string };
}
const page = () => {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext) ?? { cartProducts: [] };
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [landmark, setLandmark] = useState('');
  


  useEffect(() => {
    if (cartProducts.length > 0) {
      (async function () {
        const { product } = await getCartProduct(cartProducts);
        setProducts(product);
      })();
    }else{
      setProducts([]);
    }
  }, [cartProducts]);

  const moreOfThisProduct = (productId: string) => {
    if (addProduct) {
      addProduct(productId);
    }
  };

  const lessOfThisProduct = (productId: string) => {
    if (removeProduct) {
      removeProduct(productId);
    }
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price;

    if (price) {
      total += price;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 nav-center mt-10">
      <div className="bg-white rounded-md col-span-2 p-8">
        <h2 className="font-bold">Cart</h2>
        {!cartProducts?.length ? (
          <div>Your cart is empty</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th className="w-[60%]">Product</th>
                  <th>Quantity</th>
                  <th>Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={index}>
                    <td className="flex ">
                      <div className="w-[100px] h-[100px] p-3 shadow-md border border-gray-100 center rounded-md">
                        <img
                          src={product.images[0]}
                          alt="cart product"
                          className="max-w-[80px] max-h-[80px]"
                        />
                      </div>
                      <div className=" text-left w-7/12 ml-6">
                        <div className="text-[1.2rem] text-gray-500 font-semibold">{product?.title}</div>
                        <div className="line-clamp-2 text-balance text-gray-400 text-[.8rem]">{product?.description}</div>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => lessOfThisProduct(product._id)}
                        className="bg-gray-400 w-6 rounded text-center text-white pb-0.5 mr-1"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-500">
                        {cartProducts.filter((id) => id === product._id).length}
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(product?._id)}
                        className=" bg-gray-400 w-6 rounded text-center text-white pb-0.5 ml-1"
                        type="button"
                      >
                        +
                      </button>
                    </td>
                    <td> ${cartProducts.filter((id) => id === product._id).length *product.price || "-"}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>{"$" + total || "-"}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
      {!!cartProducts?.length && (
        <form method="POST" action={'/api/checkout'} 
          className="bg-white max-h-fit rounded-md col-auto p-8"
        >
          <h2>Order information</h2>
          <input className="input-b" type="text" placeholder="Name" value={name} name="name" onChange={(e) => setName(e.target.value)} />
          <input className="input-b" type="email" placeholder="Email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
          <div className="flex gap-4">
            <input className="input-b" type="text" placeholder="City" value={city} name="city" onChange={(e) => setCity(e.target.value)} />
            <input className="input-b" type="number" placeholder="Postel Code" value={postalCode} name="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <input className="input-b" type="text" placeholder="Landmark" value={landmark} name="landmark" onChange={(e) => setLandmark(e.target.value)} />
          <input className="input-b" type="text" placeholder="Country" value={country} name="country" onChange={(e) => setCountry(e.target.value)} />
          <button type="submit" className="btn-primary1 bg-primary-800 rounded-md text-white btn_block mt-6 py-2">
            Continue to payment
          </button>
        </form>
      )}
    </div>
  );
};

export default page;
