import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogClose,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { useCategories } from "@/hooks/query/use-categories";
import { categorySchema } from "@/schemas/category-schema";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateCategoryProps {
   updateDefaultCategory: (category: string) => void;
}

const CreateCategory = ({ updateDefaultCategory }: CreateCategoryProps) => {
   const {
      createCategory: { mutateAsync, isLoading, reset },
      getCategories: { refetch },
   } = useCategories();

   const form = useForm<z.infer<typeof categorySchema>>({
      resolver: zodResolver(categorySchema),
   });

   async function onSubmit(values: z.infer<typeof categorySchema>) {
      try {
         const createdCategory = await mutateAsync(values);
         await refetch();
         form.reset();
         reset();

         //- Update the default category in the parent component
         if (createdCategory.data._id) {
            updateDefaultCategory(createdCategory.data._id);
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant={"outline"}
               border={"default"}
               className='h-[54px] px-7 text-neutral-900/95 dark:border-gray-600/50 dark:text-slate-50 dark:hover:text-neutral-900/95 dark:hover:bg-neutral-100/90'
            >
               Create category
            </Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>New category</DialogTitle>
               <DialogDescription>
                  Create a new category to better organize your transactions. Choose a name that
                  reflects the nature of your expenses or incomes, making it easier to track and
                  manage your financial activities.
               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     form.handleSubmit(onSubmit)();
                  }}
                  className={cn(isLoading ? "opacity-60" : "opacity-100")}
                  id='create-category-form'
               >
                  <FormField
                     control={form.control}
                     name='name'
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 placeholder='Category Name'
                                 type='text'
                                 className='my-2 sm:max-w-sm'
                                 {...field}
                                 value={field.value || ""}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <DialogFooter>
                     <DialogClose asChild>
                        <Button
                           type='submit'
                           variant={"outline"}
                           border={"default"}
                           className='px-6 text-neutral-900/95 dark:border-gray-600/50 dark:text-slate-50 dark:hover:text-neutral-900/95 dark:hover:bg-neutral-100/90'
                           form='create-category-form'
                        >
                           Create category
                        </Button>
                     </DialogClose>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default CreateCategory;
