"use client";
import Image from "next/image";
import React from "react";
import logo from "@/lib/data/logo.svg";
import { lora } from "@/components/Header";

const page = () => {
  return (
    <div className={`${lora.className}`}>
      <div className="flex h-[85vh] items-center justify-center gap-x-6 max-sm:flex-col">
        <Image
          src={logo}
          alt="watermarklogo"
          className=""
          width={150}
          height={150}
        />
        <h1 className="animate-pulse text-5xl font-bold text-gray-800">
          Please Wait...
        </h1>
      </div>
    </div>
  );
};

export default page;
