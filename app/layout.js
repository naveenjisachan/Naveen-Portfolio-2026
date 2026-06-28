import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://naveen.dev"),
  title: "Naveen Sachan — Senior Frontend Developer | React, Next.js, Micro Frontend",
  description:
    "Premium portfolio of Naveen Sachan — Senior Frontend Developer with 7+ years building scalable React, Next.js, TypeScript & Micro Frontend applications at EXL, TELUS, Samsung, Amazon, L&T and more.",
  keywords: [
    "Naveen Sachan", "Senior Frontend Developer", "React Developer", "Next.js Developer",
    "Micro Frontend", "TypeScript", "Angular", "Vue.js", "Portfolio", "India", "Noida",
  ],
  authors: [{ name: "Naveen Sachan" }],
  openGraph: {
    title: "Naveen Sachan — Senior Frontend Developer",
    description:
      "7+ years building premium React, Next.js & Micro Frontend experiences. Explore my work, projects and chat with Naveen's Buddy AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveen Sachan — Senior Frontend Developer",
    description: "7+ years building premium React, Next.js & Micro Frontend experiences.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
