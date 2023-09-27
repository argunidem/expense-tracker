import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useActiveSection = () => {
   const [active, setActive] = useState("");

   const pathname = usePathname();

   useEffect(() => {
      const handleScroll = () => {
         const sections = document.querySelectorAll("section");
         let currentActiveSection = "";

         sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 250 && rect.bottom >= 250) {
               currentActiveSection = section.id;
            }
         });

         if (!currentActiveSection && window.scrollY === 0 && pathname === "/") {
            setActive("home");
         } else if (pathname !== "/") {
            setActive(pathname.split("/")[1]);
         } else {
            setActive(currentActiveSection);
         }
      };

      window.addEventListener("scroll", handleScroll);

      if (window.scrollY === 0 && pathname === "/") {
         setActive("home");
      } else if (pathname !== "/") {
         setActive(pathname.split("/")[1]);
      }

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [pathname]);

   return active;
};

export default useActiveSection;
