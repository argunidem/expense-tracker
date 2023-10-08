import Navbar from "@/components/ui/navbar/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         {children}
      </>
   );
}
