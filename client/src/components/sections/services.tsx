import { services } from "@/constants/services";
import ServiceItem from "./service-item";

const Services = () => {
   return (
      <section
         id='services'
         className='max-w-[1600px] mx-auto py-24 text-neutral-700 dark:text-neutral-300/80 md:py-32'
      >
         <h2 className='mb-12 text-center text-3xl font-bold md:text-4xl md:mb-28'>Services</h2>
         <div className='grid mx-12 gap-3 sm:grid-cols-2 md:mx-14 md:gap-8 lg:mx-28 xl:grid-cols-4'>
            {services.map((service, index) => (
               <ServiceItem
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
               />
            ))}
         </div>
      </section>
   );
};

export default Services;
