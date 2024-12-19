import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import { CartContextProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import { Metadata } from "next";


const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const metadata:Metadata = {
  title: "Shopnest",
  description: "Do you need something, Let's buy together",
  applicationName: "Shopnest",
  keywords: ["Shopnest", "ShopNest", "shopnest", "shop nest", "shopnest ecommerce website", "shopnest store" ],
  creator: "Arman Alam",
  icons:"logo2.png"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <CartContextProvider>
          <Header />
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
