"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("ct");

  console.log(searchQuery?.split(","));
  return (
    <>
      <div>jkj</div>
    </>
  );
};

export default Categories;
