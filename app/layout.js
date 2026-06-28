import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Naveen Sachan — Senior Frontend Developer",
  description:
    "Premium portfolio of Naveen Sachan — Senior Frontend Developer with 7+ years building scalable React, Next.js and Micro Frontend applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#06030f] text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
