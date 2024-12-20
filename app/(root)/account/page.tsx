/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

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
  const {data: session} = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");



  return (
    <div className="grid grid-cols-3 gap-10 nav-center mt-10">
      <div className="bg-white h-fit rounded-md col-span-2 p-8 pb-12">
        <h2 className="font-bold">Orders</h2>
        {!products?.length ? (
          <div>Your Order is empty</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th className="w-[52%]">Product</th>
                  <th className="w-[32%]">Address</th>
                  <th>Quantity</th>
                  <th>Paid</th>
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
                      <div className=" text-left w-8/12 ml-6">
                        <div className="text-[1.2rem] text-gray-500 font-semibold">
                          {product?.title}
                        </div>
                        <div className="line-clamp-2 text-balance text-gray-400 text-[.8rem]">
                          {product?.description}
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-400 ">
                      name: Arman Alam <br />
                      email: arman123@gmail.com <br />
                      address: Motihari {","} 1234
                      {","} RajaBAjar
                      {","} India
                      {/* name: {order.name} <br />
                      email: {order.email} <br />
                      address: {order.city} {","} {order.postalCode}
                      {","} {order.landmark}
                      {","} {order.country} */}
                    </td>
                    <td>
                      <span className="font-semibold pl-8 text-gray-500">
                        {/* {cartProducts.filter((id) => id === product._id).length} */} 1
                      </span>
                    </td>
                    <td className="font-semibold text-green-700">Yes</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
        <form
          className="bg-white max-h-fit rounded-md col-auto p-8"
        >
          <h2>Order information</h2>
          <input
            className="input-b"
            type="text"
            required
            placeholder="Name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input-b"
            type="email"
            required
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              className="input-b"
              type="text"
              required
              placeholder="City"
              value={city}
              name="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="input-b"
              type="number"
              required
              placeholder="Postel Code"
              value={postalCode}
              name="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <input
            className="input-b"
            type="text"
            required
            placeholder="Landmark"
            value={landmark}
            name="landmark"
            onChange={(e) => setLandmark(e.target.value)}
          />
          <input
            className="input-b"
            type="text"
            required
            placeholder="Country"
            value={country}
            name="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary1 bg-primary-800 rounded-md text-white btn_block mt-6 py-2"
          >
            Continue to payment
          </button>
          <button type="button" onClick={() => signOut()}>Logout</button>

        </form>
    </div>
  );
};

export default page;
