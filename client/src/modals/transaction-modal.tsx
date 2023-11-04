"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Modal from "./base-modal";
import { useModal, useDetails } from "@/hooks/store";
import { useIncomes } from "@/hooks/use-incomes";
import { useExpenses } from "@/hooks/use-expenses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/utils/cn";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { incomeSchema } from "@/schemas/income-schema";
import { expenseSchema } from "@/schemas/expense-schema";
import { Calendar as CalendarIcon, Info, Plus } from "lucide-react";
import { TransactionData } from "@/interfaces/transaction";

const TransactionModal = () => {
   const [isRegular, setIsRegular] = useState(false);
   const { isOpen, modal, toggleModal } = useModal();
   const { data } = useDetails();
   const {
      createIncome: { mutateAsync: createIncome, isLoading: incomeLoading, reset: resetIncome },
      updateIncome: { mutateAsync: updateIncome },
   } = useIncomes();
   const {
      createExpense: { mutateAsync: createExpense, isLoading: expenseLoading, reset: resetExpense },
      updateExpense: { mutateAsync: updateExpense },
   } = useExpenses();

   const path = usePathname();
   const isIncome = path === "/incomes";

   const title = isIncome ? "Income" : path === "/expenses" ? "Expense" : "Transaction";
   const reset = isIncome ? resetIncome : resetExpense;
   const isLoading = isIncome ? incomeLoading : expenseLoading;
   const schema = isIncome ? incomeSchema : expenseSchema;
   const createTransaction = isIncome ? createIncome : createExpense;
   const updateTransaction = isIncome ? updateIncome : updateExpense;

   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         amount: 0,
         date: new Date() as unknown as string,
      },
   });

   useEffect(() => {
      if (data && modal === "update") {
         const defaultValues = {
            amount: data.value.income || data.value.expense,
            name: data.value.name,
            description: (data?.value as TransactionData).description,
            source: (data?.value as TransactionData).source,
            category: (data?.value as TransactionData).category,
            regular: (data?.value as TransactionData).regular,
            date: new Date(data?.value.date) as unknown as string,
         };

         setIsRegular((data?.value as TransactionData).regular || false);
         form.reset(defaultValues);
      } else {
         setIsRegular(false);
         form.reset({
            amount: 0,
            date: new Date() as unknown as string,
         });
      }
   }, [data, modal, form]);

   async function onSubmit(values: z.infer<typeof schema>) {
      try {
         if (modal === "transaction") {
            await createTransaction(values);
         } else if (data) {
            await updateTransaction({ id: data?.value.id, values: { ...values } });
         }
         form.reset();
         reset();
         setIsRegular(false);
         toggleModal();
      } catch (error) {
         console.error(error);
      }
   }

   const bodyContent = (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
               "w-full max-w-xs mx-auto space-y-5 mt-12 mb-8 sm:max-w-sm",
               isLoading ? "opacity-60" : "opacity-100",
               isRegular ? "" : "mt-8 -mb-10"
            )}
         >
            <FormField
               control={form.control}
               name='amount'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           type='number'
                           className='sm:max-w-sm'
                           {...field}
                           onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='name'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder='Name'
                           type='text'
                           className='sm:max-w-sm'
                           {...field}
                           value={field.value || ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='description'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder='Description'
                           type='text'
                           className='sm:max-w-sm'
                           {...field}
                           value={field.value || ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={isIncome ? "source" : "category"}
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder={isIncome ? "Source" : "Category"}
                           type='text'
                           className='sm:max-w-sm'
                           {...field}
                           value={field.value || ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className='flex flex-col gap-y-5 sm:flex-row sm:gap-x-3'>
               <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                     <FormItem>
                        <Popover>
                           <PopoverTrigger asChild>
                              <FormControl>
                                 <Button
                                    variant={"outline"}
                                    border={"default"}
                                    className={cn(
                                       "w-full py-7 justify-start text-left text-gray-600 dark:text-gray-200 dark:hover:text-gray-600 font-normal sm:w-[250px] sm:py-5",
                                       !field.value && "text-muted-foreground"
                                    )}
                                 >
                                    <CalendarIcon className='mr-2 h-4 w-4 opacity-80' />
                                    {field.value ? (
                                       format(new Date(field.value), "PPP")
                                    ) : (
                                       <span>{format(new Date(), "PPP")}</span>
                                    )}
                                 </Button>
                              </FormControl>
                           </PopoverTrigger>
                           <PopoverContent className='w-auto p-0 dark:border-gray-500/50'>
                              <Calendar
                                 className='px-2 dark:bg-neutral-900'
                                 mode='single'
                                 selected={new Date(field.value)}
                                 onSelect={field.onChange}
                                 initialFocus
                              />
                           </PopoverContent>
                        </Popover>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name='regular'
                  render={({ field }) => (
                     <div className='flex items-center gap-x-1 leading-none'>
                        <FormItem className='flex items-center pl-2 space-x-2 space-y-0'>
                           <FormControl>
                              <Checkbox
                                 checked={field.value}
                                 onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    setIsRegular(!isRegular);
                                 }}
                              />
                           </FormControl>
                           <FormLabel className='text-gray-600 dark:text-gray-200/90'>
                              Regular <span className='inline sm:hidden'>Income</span>
                           </FormLabel>
                        </FormItem>
                        <Tooltip>
                           <TooltipTrigger disabled>
                              <Info
                                 size={15}
                                 className='text-gray-500/90'
                              />
                           </TooltipTrigger>
                           <TooltipContent className='px-5 py-2'>
                              <p className='max-w-xs'>
                                 If you check this box, this transaction will be added to your
                                 budget every month.
                              </p>
                           </TooltipContent>
                        </Tooltip>
                     </div>
                  )}
               />
            </div>

            <div
               className={cn(
                  "transition duration-300",
                  isRegular ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
               )}
            >
               <FormField
                  control={form.control}
                  name='expiresAt'
                  render={({ field }) => (
                     <FormItem className='flex flex-col'>
                        <Popover>
                           <PopoverTrigger asChild>
                              <FormControl>
                                 <Button
                                    variant={"outline"}
                                    border={"default"}
                                    className={cn(
                                       "w-full py-7 justify-start text-left text-gray-600 dark:text-gray-200 dark:hover:text-gray-600 font-normal sm:w-[250px] sm:py-5",
                                       !field.value && "text-muted-foreground"
                                    )}
                                 >
                                    <CalendarIcon className='mr-2 h-4 w-4 opacity-80' />
                                    {field.value ? (
                                       format(new Date(field.value), "MMMM, yyyy", { locale: enUS })
                                    ) : (
                                       <span>No expiry month</span>
                                    )}
                                 </Button>
                              </FormControl>
                           </PopoverTrigger>
                           <PopoverContent className='w-auto p-0 dark:border-gray-500/50'>
                              <Calendar
                                 className='px-2 dark:bg-neutral-900'
                                 mode='single'
                                 selected={(field.value && new Date(field.value)) || undefined}
                                 onSelect={field.onChange}
                                 initialFocus
                                 footer={
                                    <div className='flex justify-center text-sm pt-1'>
                                       <Button
                                          variant={"outline"}
                                          border={"default"}
                                          size={"none"}
                                          className='px-3 py-1 rounded-sm'
                                          onClick={() => field.onChange(undefined)}
                                       >
                                          Don't set an expiry month
                                       </Button>
                                    </div>
                                 }
                              />
                           </PopoverContent>
                        </Popover>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <Button
               className={cn(isRegular ? "translate-y-0" : "-translate-y-20 sm:-translate-y-16")}
               variant={"auth"}
               size={"none"}
               type='submit'
            >
               <Plus className='w-6 h-6 -ml-2' />
               <span className='ml-3'>
                  {modal === "transaction" ? "Create" : "Update"}{" "}
                  {path === "/incomes"
                     ? "Income"
                     : path === "/expenses"
                     ? "Expense"
                     : "Transaction"}
               </span>
            </Button>
         </form>
      </Form>
   );

   return (
      <Modal
         isOpen={isOpen && (modal === "transaction" || modal === "update")}
         title={title}
         onClose={toggleModal}
         body={bodyContent}
      />
   );
};

export default TransactionModal;
