"use client";
import AddressShower from "@/components/client/AddressShower";
import { lora } from "@/components/Header";
import { AddressSaver } from "@/lib/action/addressSaver";
import { allOrderItems } from "@/lib/action/products.action";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IProducts {
  title: string;
  images: string[];
  description: string;
}
interface IOrders {
  line_items: [{ quantity: number }];
  name: string;
  email: string;
  products: IProducts[];
  city: string;
  postalCode: string;
  landmark: string;
  country: string;
  paid: boolean;
}

const page = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [prevAddress, setPrevAddress] = useState([]);

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) return;
      const { orderItems } = await allOrderItems(session?.user?.id);
      if (!orderItems) {
        throw new Error("Failed to fetch orders");
      }
      setOrders(orderItems);
    })();
  }, [session?.user]);

  const handleAddressSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (session) formData.append('_id', session.user.id);
    const response = await AddressSaver(formData);
    
    if (response.status === 'ok') {
      setPrevAddress(response?.clientUser?.address);
      setName("");
      setEmail("");
      setCity("");
      setCountry("");
      setPostalCode("");
      setLandmark("");
    }   
  };
  
  return (
    <div className="grid overflow-y-auto grid-cols-3 max-lg:grid-cols-1 max-lg:mb-2 max-lg:gap-y-2 lg:gap-10 nav-center mt-10">
      <div className="white_box">
        <Link
          href={process.env.NEXT_PUBLIC_ADMIN_URL || ""}
          className={`absolute ${lora.className} cursor-pointer text-sm border-2 border-gray-300
          rounded-2xl bg-gray-900 text-white right-8 py-2 px-4 top-8 active:border-gray-600
           active:bg-white transition-colors active:text-gray-600`}
        >
          Login as Seller
        </Link>
        <h2 className={` ${lora.className} `}>Orders</h2>
        {!orders?.length ? (
          <div className={`text-gray-500 ${lora.className}`}>Your Order is empty</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th className="lg:w-[52%] max-lg:w-[40%]">Product</th>
                  <th className="max-lg:w-[50%] lg:w-[32%]">Address</th>
                  <th className="w-16 max-sm:hidden">Paid</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody >
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <td className="flex py-8 flex-col gap-4 ">
                      {order?.products.length > 0 &&
                        order.products.map((product, index) => (
                          <div key={index} className="flex">
                            <div className="w-[100px] h-[100px] p-3 shadow-md border border-gray-100 center rounded-md">
                              <img
                                src={product?.images[0]}
                                alt="order product"
                                className="max-w-[80px] max-h-[80px]"
                              />
                            </div>
                            <div className=" text-left max-lg:hidden w-8/12 ml-6">
                              <div className="text-[1.2rem] text-gray-500 font-semibold">
                                {product?.title}
                              </div>
                              <div className="line-clamp-2 text-balance text-gray-400 text-[.8rem]">
                                {product?.description}
                              </div>
                            </div>
                          </div>
                        ))}
                    </td>
                    <td className="text-sm relative text-gray-400 ">
                      <div className="absolute text-wrap top-10 left-0 right-0">
                        name: {order.name} <br />
                        email: {order.email} <br />
                        address: {order.city} , {order.postalCode},{" "}
                        {order.landmark}, {order.country}
                      </div>
                    </td>
                    <td className={`font-semibold max-sm:hidden relative ${order.paid ? 'text-green-700' : 'text-red-600'}`}>
                      <p className="absolute top-16 ">
                        {order.paid ? "Yes" : "No"}
                      </p>
                    </td>
                    <td className="relative ">
                      <div className="font-semibold absolute pl-4 top-16 flex flex-col gap-20 text-gray-500">
                        {order?.line_items.length > 0 &&
                          order?.line_items.map((item, litem) => (
                            <p className="pl-1 " key={litem}>
                              {item.quantity} 
                            </p>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div>
        <form
          className="white_box"
          onSubmit={handleAddressSave}
        >
          <button
            type="button"
            className={`absolute ${lora.className} font-semibold btn-primary1 btn_primary_Outline border-2
            rounded-2xl text-gray-600 right-8 top-8 active:bg-gray-900 active:text-white`}
            onClick={() => signOut()}
          >
            Logout
          </button>
          <h2 className={`${lora.className}`}>New Address</h2>
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
            Save
          </button>
        </form>
        <AddressShower 
        prevAddress= {prevAddress}
        setName = {setName}
        setEmail = {setEmail}
        setCity = {setCity}
        setCountry = {setCountry}
        setPostalCode = {setPostalCode}
        setLandmark = {setLandmark}
        />
      </div>
    </div>
  );
};

export default page;
