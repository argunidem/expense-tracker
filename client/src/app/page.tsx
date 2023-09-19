import * as React from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";

const Home = () => {
   return (
      <main className='min-h-screen overflow-x-hidden dark:bg-zinc-900'>
         <Navbar />
         <Hero />
         <Services />
      </main>
   );
};

export default Home;
