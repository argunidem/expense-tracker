import { makeRequest } from "@/utils/request";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/react-query/query-client";
import { ProfileResponse } from "@/interfaces/profile";

export const prefetchQueries = async (cookies: string) => {
   const queryClient = getQueryClient();
   await queryClient.prefetchQuery(["budgets"], () => makeRequest("/budgets", { cookies }));
   await queryClient.prefetchQuery(["transactions"], () =>
      makeRequest("/transactions", { cookies, params: { sort: "date", populate: "category" } })
   );

   return dehydrate(queryClient);
};

export const prefetchProfile = async (cookies: string): Promise<ProfileResponse> => {
   const queryClient = getQueryClient();
   await queryClient.prefetchQuery(["profile"], () =>
      makeRequest<ProfileResponse>("/users/profile", { cookies })
   );
   return dehydrate(queryClient).queries.find((query) => query.queryKey[0] === "profile")?.state
      .data as ProfileResponse;
};
