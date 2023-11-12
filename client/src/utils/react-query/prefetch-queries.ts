import { makeRequest } from "@/utils/request";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/react-query/query-client";

export const prefetchQueries = async (cookies: string) => {
   const queryClient = getQueryClient();

   await queryClient.prefetchQuery(["budgets"], () => makeRequest("/budgets", { cookies }));
   await queryClient.prefetchQuery(["transactions"], () =>
      makeRequest("/transactions", { cookies, params: { sort: "date", populate: "category" } })
   );

   return dehydrate(queryClient);
};
