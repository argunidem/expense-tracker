import { Gem } from "lucide-react";
import Plan from "./plan";
import { plans } from "@/constants/pricing";

const Pricing = () => {
   return (
      <section
         id='pricing'
         className='relative pt-24 pb-32 text-neutral-800/80 dark:text-neutral-300 dark:bg-neutral-950/30 md:pt-32 md:pb-40'
      >
         <h2 className='mb-20 text-center text-3xl font-bold dark:text-neutral-300/80 md:text-4xl md:mb-28'>
            Pricing
         </h2>
         <div className='flex flex-wrap items-center space-y-10 max-w-md mx-auto md:px-8 md:max-w-6xl md:space-y-0'>
            {plans.map((plan, index) => (
               <Plan
                  key={index}
                  plan={plan}
               />
            ))}
         </div>
         <Gem
            size={60}
            className='absolute left-1/2 -translate-x-1/2 top-6 -z-10 text-neutral-100/70 sm:top-9'
         />
      </section>
   );
};

export default Pricing;
