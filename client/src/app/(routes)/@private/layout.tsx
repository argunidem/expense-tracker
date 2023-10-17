import { cookies } from "next/headers";
import { getBudgetsFn } from "@/hooks/use-budgets";
import { getExpensesFn } from "@/hooks/use-expenses";
import { getIncomesFn } from "@/hooks/use-incomes";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/utils/react-query/hydrate";
import { getQueryClient } from "@/utils/react-query/query-client";

import Sidebar from "@/components/ui/sidebar/sidebar";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
   const sid = cookies().toString();
   const queryClient = getQueryClient();

   await queryClient.prefetchQuery(["budgets"], () => getBudgetsFn(sid));
   await queryClient.prefetchQuery(["expenses"], () => getExpensesFn(sid));
   await queryClient.prefetchQuery(["incomes"], () => getIncomesFn(sid));
   const dehydratedState = dehydrate(queryClient);

   return (
      <Hydrate state={dehydratedState}>
         <main className='min-h-screen overflow-x-hidden text-neutral-800/90 dark:bg-neutral-900/40 dark:text-neutral-200 lg:flex lg:justify-end'>
            <Sidebar />
            <section className='ml-20 my-10 sm:px-6 lg:ml-0 lg:w-[calc(100%-280px)]'>
               {children}
            </section>
         </main>
      </Hydrate>
   );
}
