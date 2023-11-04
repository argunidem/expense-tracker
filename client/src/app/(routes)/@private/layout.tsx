import { cookies } from "next/headers";
import Hydrate from "@/utils/react-query/hydrate";
import { prefetchQueries } from "@/utils/react-query/prefetch-queries";
import { DetailsModal, TransactionModal } from "@/modals";
import Sidebar from "@/components/ui/sidebar/sidebar";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
   const sid = cookies().toString();
   const dehydratedState = await prefetchQueries(sid);

   return (
      <Hydrate state={dehydratedState}>
         <DetailsModal />
         <TransactionModal />
         <main className='min-h-screen overflow-x-hidden text-neutral-800/90 dark:bg-neutral-900/40 dark:text-neutral-200 lg:flex lg:justify-end'>
            <Sidebar />
            <section className='ml-20 my-10 sm:px-6 lg:ml-0 lg:w-[calc(100%-280px)]'>
               {children}
            </section>
         </main>
      </Hydrate>
   );
}
