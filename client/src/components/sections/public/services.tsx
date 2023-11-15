import { services } from "@/constants/services";

const Services = () => {
   return (
      <section
         id='services'
         className='max-w-[1600px] mx-auto py-24 text-neutral-700 dark:text-neutral-300/80 md:py-32'
      >
         <h2 className='mb-12 text-center text-3xl font-bold md:text-4xl md:mb-28'>Services</h2>
         <div className='grid mx-12 gap-3 sm:grid-cols-2 md:mx-14 md:gap-8 lg:mx-28 xl:grid-cols-4'>
            {services.map(({ title, description, icon: Icon }, index) => (
               <div
                  key={index}
                  className='flex flex-col items-center space-y-5 px-9 py-16 border rounded-md border-slate-100 transition-all duration-300 text-center dark:hover:bg-neutral-950/10 dark:border-neutral-800/40 hover:shadow-lg hover:bg-gray-100 sm:px-12'
               >
                  <Icon
                     size={70}
                     className='dark:text-neutral-400'
                  />
                  <h4 className='text-lg font-semibold'>{title}</h4>
                  <p className='text-sm font-light'>{description}</p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Services;
