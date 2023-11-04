import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/providers/react-query";
import { ThemeProvider } from "@/providers/theme";
import { TooltipProvider } from "@/providers/tooltip";
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
               <TooltipProvider>
                  <ReactQueryProvider>
                     {children}
                     <Toaster />
                  </ReactQueryProvider>
               </TooltipProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
