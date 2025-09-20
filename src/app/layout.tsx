import type { Metadata } from "next";

import "./globals.css";
import { Cairo } from "next/font/google";
import QueryProvider from "@/components/custom/atoms/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { metaData } from "@/lib/const-data";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.desc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${cairo.variable}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
