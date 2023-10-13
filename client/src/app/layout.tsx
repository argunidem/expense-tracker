import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toast/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "XpenseWise",
   description: "An easy way to track your expenses.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
                  {children}
                  <Toaster />
               </ReactQueryProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
