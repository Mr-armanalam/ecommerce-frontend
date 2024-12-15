import { Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  weight: ['400','500','700','900',],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap"
});


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
