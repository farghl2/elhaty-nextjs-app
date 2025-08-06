import type { Metadata } from "next";

import "./globals.css";

import { Cairo } from "next/font/google";
import Header from "@/components/custom/atoms/Header";
import WhatsAppBtn from "@/components/custom/atoms/WhatsAppBtn";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});



export const metadata: Metadata = {
  title: "SpeedOrderX",
  description: "خلي مطعمك ميوقفش طلبات",
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;

}>) {

  
  return (
    <html lang="ar" >
      <body
        className={`${cairo.variable}  antialiased`}
      >
       
        
        {children}

      </body>
    </html>
  );
}
