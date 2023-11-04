import { makeRequest } from "@/utils/request";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/react-query/query-client";

export const prefetchQueries = async (cookies: string) => {
   const queryClient = getQueryClient();

   await queryClient.prefetchQuery(["budgets"], () => makeRequest("/budgets", { cookies }));
   await queryClient.prefetchQuery(["expenses"], () =>
      makeRequest("/expenses", { cookies, params: { sort: "date" } })
   );
   await queryClient.prefetchQuery(["incomes"], () =>
      makeRequest("/incomes", { cookies, params: { sort: "date" } })
   );

   return dehydrate(queryClient);
};
