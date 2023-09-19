import { services } from "@/constants/services";
import ServiceItem from "./service-item";

const Services = () => {
   return (
      <section className='max-w-[1600px] mx-auto my-20 text-neutral-700'>
         <h2 className='my-12 text-center text-3xl font-bold dark:text-neutral-300 md:text-4xl md:my-24'>
            Services
         </h2>
         <div className='grid mx-16 gap-3 sm:grid-cols-2 md:gap-8 lg:mx-28 xl:grid-cols-4'>
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
