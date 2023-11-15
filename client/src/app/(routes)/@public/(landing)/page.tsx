import Hero from "@/components/sections/public/hero";
import Services from "@/components/sections/public/services";
import Features from "@/components/sections/public/features";
import Testimonials from "@/components/sections/public/testimonials";
import Pricing from "@/components/sections/public/pricing/pricing";
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
