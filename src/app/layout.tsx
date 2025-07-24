import type { Metadata } from "next";

import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Cairo } from "next/font/google";
import Header from "@/components/custom/atoms/Header";
import WhatsAppBtn from "@/components/custom/atoms/WhatsAppBtn";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const cairo = Cairo({
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
        className={`${cairo.variable} ${jakarta.variable} antialiased`}
      >
        <div className="flex flex-col">
        <Header />
        <WhatsAppBtn phoneNumber={1122882154}/>
        {children}
        </div>
      </body>
    </html>
  );
}
