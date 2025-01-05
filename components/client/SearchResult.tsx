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
    <div className="no-scrollbar absolute top-14 z-40 max-h-96 w-[47.6rem] overflow-y-auto rounded-b-2xl border-x-2 border-b-2 border-gray-500 bg-[#222] p-4">
      <div className="flex justify-between">
        <h3 className="mb-3 text-xl font-bold text-gray-200">Results:</h3>
        <span className="text-sm font-semibold text-gray-200">
          {searchList?.length} results
        </span>
      </div>
      {searchList?.length > 0 && (
        <div className="flex flex-col gap-2">
          {searchList.map((product: any, index: number) => (
            <Link
              href={`/products/${product?.id}`}
              key={index}
              className="cursor-pointer rounded-md p-1.5 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <span>{product?.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
