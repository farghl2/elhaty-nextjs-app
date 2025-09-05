import type { Metadata } from "next";

import "./globals.css";

import { Cairo } from "next/font/google";
import Header from "@/components/custom/atoms/Header";
import WhatsAppBtn from "@/components/custom/atoms/WhatsAppBtn";
import QueryProvider from "@/components/custom/atoms/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});



export const metadata: Metadata = {
  title: "Elhaty | الحاتي",
  description: "لحمة بلدي 100%",
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
       <ThemeProvider
         attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
       >

        <QueryProvider>

        {children}
        </QueryProvider>
       </ThemeProvider>

      </body>
    </html>
  );
}
