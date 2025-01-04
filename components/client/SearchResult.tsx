/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { searchProducts } from "@/lib/action/getSearchResult.action";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchResult = () => {
  const [searchList, setSearchList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const handleSearchProducts = async () => {
    const fetchedProducts = await searchProducts({ query: searchQuery });
    setSearchList(JSON.parse(fetchedProducts));
  };

  useEffect(() => {
    handleSearchProducts();
  }, [searchQuery]);
  return (
    // <div className='w-[47.5rem] bg-white'>
    <div className="w-[47.6rem] rounded-b-2xl border-x-2 border-b-2 border-gray-500 bg-primary-100 p-4">
      <h3 className="mb-2 text-xl font-bold text-gray-500">Results:</h3>
      {searchList?.length > 0 && (
        <div>
          {searchList.map((product: any, index: number) => (
            <div key={index}>
              <Link href={`/products/${product?._id}`}>{product?.title}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
