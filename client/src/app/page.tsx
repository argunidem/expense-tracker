import * as React from "react";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import Pricing from "@/components/sections/pricing";
import Footer from "@/components/sections/footer";

const Home = () => {
   return (
      <>
         <Navbar />
         <main className='min-h-screen overflow-x-hidden dark:bg-zinc-900'>
            <Hero />
            <Services />
            <Features />
            <Testimonials />
            <Pricing />
            <Footer />
         </main>
      </>
   );
};

export default Home;
