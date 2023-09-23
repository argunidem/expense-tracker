interface ScrollToSection {
   (event: React.MouseEvent<HTMLAnchorElement>): void;
}

//! Scroll to the section when the user clicks on a link
export const scrollToSection: ScrollToSection = (event) => {
   event.preventDefault();

   //- Get the section id from the href attribute
   const href = "#" + (event.target as HTMLAnchorElement).href.split("#")[1];

   //- Get the section element
   const section = document.querySelector(href || "") as HTMLElement;

   //- Scroll to the section if it exists
   if (section) {
      window.scroll({
         top: section.offsetTop,
         behavior: "smooth",
      });
   }
};
