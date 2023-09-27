import * as React from "react";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import Pricing from "@/components/sections/pricing/pricing";
import Footer from "@/components/ui/footer";

const Home = () => {
   return (
      <main className='min-h-screen overflow-x-hidden dark:bg-zinc-900'>
         <Hero />
         <Services />
         <Features />
         <Testimonials />
         <Pricing />
         <Footer />
      </main>
   );
};

export default Home;
