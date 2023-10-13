import Sidebar from "@/components/ui/sidebar/sidebar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <main className='min-h-screen overflow-x-hidden text-neutral-800/90 dark:bg-neutral-900/40 dark:text-neutral-200 lg:flex lg:justify-end'>
            <Sidebar />
            <section className='ml-20 my-10 sm:px-6 lg:ml-0 lg:w-[calc(100%-280px)]'>
               {children}
            </section>
         </main>
      </>
   );
}