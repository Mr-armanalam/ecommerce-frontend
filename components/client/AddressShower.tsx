"use client";
import React, { useEffect, useState } from "react";
import { lora } from "../Header";
import { useSession } from "next-auth/react";
import { getAllAddresses } from "@/lib/action/getAllAddresses.action";


interface IAddresses {
  _id: string;
  name: string;
  email: string;
  city: string;
  landmark: string;
  postalCode: string;
  country: string;
}

const AddressShower = () => {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState<IAddresses[]>([]);

  const fetchAddresses = async () => {
    if (!session?.user?.id || addresses.length > 0) return;
    try {
      const { address } = await getAllAddresses(session.user.id);
      setAddresses(address);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [session?.user]);

  return (
    <div className="white_box mt-3">
      <h3 className={` ${lora.className} text-xl `}>Saved Address</h3>
      {addresses.length > 0 &&
        addresses.map((address, index) => (
          <div key={index} className="text-sm mt-4 text-gray-500">
            <p>
              {address.name},<br />
              {address.email}, <br />
              {address.city}, {address.landmark}, {' '}
              {address.country}, {address.postalCode} <br />
            </p>
          </div>
        ))}
    </div>
  );
};

export default AddressShower;


// _id
// :
// "67669152a2a8d378fb4d2203"
