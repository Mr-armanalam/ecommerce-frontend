'use client'
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useContext } from "react";

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  return (
    <header className="bg-primary-800">
      <div className="nav-center">
        <div className="flex justify-between py-5">
          <Link className="text-white" href={"/"}>Ecommerce</Link>
          <nav className="text-primary-300 flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/products">All product</Link>
            <Link href="/categories">Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts?.length})</Link>
          </nav>
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