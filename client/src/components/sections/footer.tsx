import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import NavLink from "../ui/link";

const Footer = () => {
   return (
      <footer className='flex flex-col space-y-10 justify-center py-16 px-6 bg-gray-200/70 dark:bg-transparent'>
         <nav className='flex justify-center flex-wrap gap-6'>
            <NavLink href='#home'>Home</NavLink>
            <NavLink href='#services'>Services</NavLink>
            <NavLink href='#features'>Features</NavLink>
            <NavLink href='#testimonials'>Testimonials</NavLink>
            <NavLink href='#pricing'>Pricing</NavLink>
         </nav>

         <div className='flex justify-center space-x-5'>
            <NavLink
               href='https://facebook.com'
               target='_blank'
            >
               <Facebook />
            </NavLink>
            <NavLink
               href='https://linkedin.com'
               target='_blank'
            >
               <Linkedin />
            </NavLink>
            <NavLink
               href='https://instagram.com'
               target='_blank'
            >
               <Instagram />
            </NavLink>
            <NavLink
               href='https://twitter.com'
               target='_blank'
            >
               <Twitter />
            </NavLink>
         </div>
         <p className='text-center font-medium text-neutral-600/95 dark:text-neutral-300/80'>
            &copy; 2023 <span className='font-bold'>ExpenseTracker</span> All rights reservered.
         </p>
      </footer>
   );
};

export default Footer;
