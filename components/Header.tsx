'use client'
import { CartContext } from "@/context/CartContext";
import { Lora } from "next/font/google";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { HomeIcon, MenuIcon } from "./icons";

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
})

export default function Header() {  
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <header className="bg-primary-800 ">
      <div className="nav-center">
        <div className="flex justify-between py-5">
          <Link className={`bg-gradient-to-r from-gray-400 flex to-gray-200 bg-clip-text max-sm:relative max-sm:z-20
             ${lora.className} text-transparent text-xl font-bold `} href={"/"}
          > <HomeIcon />
            QuirkCart
          </Link>
          <nav className={`text-primary-300 flex gap-4  ${mobileNavActive ? 'max-sm:flex-col' : 'max-sm:hidden'} max-sm:z-10
          max-sm:fixed max-sm:top-0 max-sm:pt-16 max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:p-5 max-sm:bg-primary-800 `}>
            <Link href="/">Home</Link>
            <Link href="/products">All product</Link>
            <Link href="/wishlist">WishList</Link>
            <Link href="/categories">Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts?.length})</Link>
          </nav>

          <button onClick={() => setMobileNavActive(prev => !prev)} 
            className="bg-transparent sm:hidden text-white max-sm:relative max-sm:z-10 "
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}



// import Center from "./Center";
// import styled from "styled-components";
// const StyledHeader = styled.header`
//   background-color:#222;
// `;

// const Logo = styled(Link)`
//   color: #fff;
//   text-decoration: none;

// `;

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 20px 0;
// `;
// const NavLink = styled(Link)`
//   color: #aaa;
//   text-decoration: none;
// `;

// const StyledNav = styled.nav`
//   display: flex;
//   gap: 15px;
// `;