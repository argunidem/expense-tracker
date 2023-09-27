import Link from "next/link";
import { Button } from "../ui/button";
import NavLink from "../ui/navbar/nav-link";

const Hero = () => {
   return (
      <section
         id='home'
         className='relative bg-hero bg-cover bg-no-repeat bg-center min-h-screen'
      >
         <div className='absolute inset-0 mt-10 bg-black/80 flex flex-col items-center justify-center sm:p-16 md:items-start xl:bg-slate-950/30'>
            <div className='w-full max-w-[1600px] mx-auto 2xl:px-16'>
               <div className='flex flex-col space-y-6 mx-auto w-3/4 md:w-5/6 lg:w-2/3 xl:w-1/2 xl:mx-0 2xl:w-1/3'>
                  <div className='flex flex-col space-y-5'>
                     <h1 className='animate-down text-white font-black tracking-tighter text-6xl flex flex-col md:flex-row xl:text-neutral-900/90'>
                        <span>Track</span>
                        <span className='hidden md:inline'>-</span>
                        <span>Save</span>
                        <span className='hidden -mr-3 md:inline'>-</span>
                        <span>Thrive</span>
                     </h1>
                     <h3 className='max-w-[240px] animate-up sm:max-w-xs md:max-w-2xl text-zinc-400 pl-1 xl:text-neutral-800'>
                        Start your journey towards financial prosperity by gaining expertise in
                        tracking expenses, discovering opportunities to save money, and excelling in
                        your financial pursuits.
                     </h3>
                  </div>
                  <div className='flex space-x-4'>
                     <Button
                        variant={"default"}
                        border={"neutral"}
                        className='animate-up sm:px-8 lg:px-12 xl:hover:text-neutral-700'
                     >
                        <Link href='/login'>Get Started</Link>
                     </Button>
                     <Button
                        variant={"outline"}
                        border={"neutral"}
                        className='animate-up'
                     >
                        <NavLink
                           href='#services'
                           className='sm:px-8 lg:px-12 xl:text-neutral-700'
                        >
                           Learn More
                        </NavLink>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Hero;
