import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/ui/navbar/navbar";
import { Toaster } from "@/components/ui/toast/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html
         suppressHydrationWarning
         lang='en'
      >
         <body className={inter.className}>
            <ThemeProvider
               attribute='class'
               defaultTheme='system'
               enableSystem
            >
               <ReactQueryProvider>
                  <Navbar />
                  {children}
                  <Toaster />
               </ReactQueryProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
