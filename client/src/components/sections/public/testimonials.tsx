import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/constants/testimonials";
import { cn } from "@/utils/cn";

const Testimonials = () => {
   return (
      <section
         id='testimonials'
         className='py-24 text-neutral-700 border-b dark:text-neutral-300 dark:border-neutral-800 md:mx-8 md:py-32'
      >
         <h2 className='mb-20 text-center text-3xl font-bold dark:text-neutral-300/80 md:text-4xl md:mb-28'>
            Testimonials
         </h2>
         <div className='grid max-w-xl mx-10 gap-10 sm:mx-auto md:grid-cols-2 md:gap-2 md:max-w-6xl'>
            {testimonials.map(({ image, name, title, quote }, index) => (
               <div
                  key={index}
                  className={cn(
                     "relative flex flex-col space-y-4 px-6 py-8 shadow-lg border border-neutral-200/60 dark:border-neutral-800/70 sm:px-8",
                     `testimonial-${index}`
                  )}
               >
                  <div className='flex items-center space-x-4'>
                     <Image
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                        className='w-20 h-20 object-cover rounded-full md:w-28 md:h-28'
                     />
                     <div>
                        <h4 className='text-lg font-semibold'>{name}</h4>
                        <h5 className='text-sm text-neutral-500'>{title}</h5>
                     </div>
                  </div>
                  <article>
                     <p className='font-light md:leading-7'>{quote}</p>
                  </article>
                  <Quote
                     size={130}
                     className='absolute -right-12 -top-4 -translate-x-1/2 -z-10 text-neutral-100/90 sm:-right-6 md:scale-125 md:top-2 lg:-right-2'
                  />
               </div>
            ))}
         </div>
      </section>
   );
};

export default Testimonials;
