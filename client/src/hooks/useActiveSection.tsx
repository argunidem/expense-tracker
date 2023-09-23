import { useEffect, useState } from "react";

const useActiveSection = () => {
   const [active, setActive] = useState("");

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

         if (window.scrollY === 0 && !currentActiveSection) {
            setActive("home");
         } else {
            setActive(currentActiveSection);
         }
      };

      window.addEventListener("scroll", handleScroll);

      if (window.scrollY === 0) {
         setActive("home");
      }

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return active;
};

export default useActiveSection;
