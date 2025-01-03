"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Searchbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div className="flex justify-center">
      <div className="mt-4 flex h-10 rounded-full border-2 border-gray-500 bg-primary-100">
        <input
          className="w-[45rem] px-4 font-semibold"
          style={{ border: "none", background: "none" }}
          placeholder="Search your products"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="h-[36px] rounded-r-full border-l-2 border-gray-500 bg-gray-800 px-2 text-white "
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
