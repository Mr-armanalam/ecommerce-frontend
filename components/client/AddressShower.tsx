"use client";
import React, { useEffect, useState } from "react";
import { lora } from "../Header";
import { useSession } from "next-auth/react";
import { getAllAddresses } from "@/lib/action/getAllAddresses.action";
import { EditIcon } from "../icons";

interface IAddresses {
  _id: string;
  name: string;
  email: string;
  city: string;
  landmark: string;
  postalCode: string;
  country: string;
}

const AddressShower = ({
  setName,
  setEmail,
  setCity,
  setCountry,
  setPostalCode,
  setLandmark,
  isCart,
  prevAddress,
}: {
  setName: (id: string) => void;
  setEmail: (id: string) => void;
  setCity: (id: string) => void;
  setCountry: (id: string) => void;
  setPostalCode: (id: string) => void;
  setLandmark: (id: string) => void;
  isCart?: boolean;
  prevAddress?: IAddresses[] | undefined;
}) => {
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
    if(prevAddress?.length){
      setAddresses(prevAddress);
    }else{
      fetchAddresses();
    }
  },[prevAddress?.length, session?.user]);

  // useEffect(() => {
  //   fetchAddresses();
  // }, [session?.user]);

  const handleAddressEdit = (address:IAddresses) => {
    setName(address.name);
    setEmail(address.email);
    setCity(address.city);
    setCountry(address.country);
    setPostalCode(address.postalCode);
    setLandmark(address.landmark);
  }

  return (
    <div className="white_box mt-3">
      <h3 className={` ${lora.className} text-xl `}>Saved Address</h3>
      {addresses.length > 0 &&
        addresses.map((address, index) => (
          <div key={index} className="text-sm bg-gray-50 rounded-md p-3 mt-4 relative text-gray-500 font-semibold">
            <span className="absolute top-1 right-2" onClick={() => handleAddressEdit(address)}>
              {isCart ? (
                <button 
                  className="border-2 border-gray-400 text-gray-400 hover:text-gray-600
                   hover:border-gray-600 font-semibold py-1 px-3 rounded-lg  "
                  >Make Payment</button>
              ) 
                : <EditIcon />
              }
            </span>
            <p>
              {address.name},<br />
              {address.email}, <br />
              {address.city}, {address.landmark}, {address.country},{" "}
              {address.postalCode} <br />
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
