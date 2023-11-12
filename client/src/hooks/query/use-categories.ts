import { makeRequest } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { CategoriesResponse, CategoryResponse, CategoryValues } from "@/interfaces/category";

export const useCategories = () => {
   const { toast } = useToast();

   const onError = (error: any) => {
      toast({
         description: error.message,
         variant: "destructive",
      });
   };

   return {
      getCategories: useQuery({
         queryKey: ["categories"],
         queryFn: () => makeRequest<CategoriesResponse>("/categories"),
         onError,
         select: ({ data }) => data,
         refetchOnMount: false,
         refetchOnWindowFocus: false,
      }),
      createCategory: useMutation({
         mutationFn: (values: CategoryValues) =>
            makeRequest<CategoryResponse>("/categories", { method: "POST", values }),
         onError,
      }),
   };
};
