import { features } from "@/constants/features";

const Features = () => {
   return (
      <section
         id='features'
         className='py-24 bg-gray-100 text-neutral-700 dark:text-neutral-300/80 dark:bg-neutral-950/20 md:py-32'
      >
         <h2 className='mb-20 text-center text-3xl font-bold md:text-4xl md:mb-24'>
            Why Choose Us
         </h2>
         <div className='grid mx-10 gap-6 md:grid-cols-2 lg:mx-28 xl:grid-cols-3'>
            {features.map(({ title, attributes }, index) => (
               <div
                  key={index}
                  className='flex flex-col space-y-2 px-6 py-8 border rounded-md border-neutral-200 dark:border-neutral-800/70 sm:border-none sm:items-center sm:py-3 sm:px-10 md:px-2 md:items-start lg:mx-auto'
               >
                  <h4 className='text-lg font-semibold'>{title}</h4>
                  <article className='max-w-sm sm:px-5 md:px-0'>
                     <p className='text-sm font-light'>- {attributes[0]}</p>
                     <p className='text-sm font-light'>- {attributes[1]}</p>
                  </article>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Features;
