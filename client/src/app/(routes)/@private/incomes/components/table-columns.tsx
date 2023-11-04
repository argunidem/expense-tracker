"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIncomes } from "@/hooks/use-incomes";
import { useToast } from "@/hooks/use-toast";
import { handleDeleteTransaction } from "@/utils/handlers/handle-delete";
import { handleCopy } from "@/utils/handlers/handle-copy";
import { ArrowUpDown, MoreHorizontal, X, Check } from "lucide-react";
import { MappedIncomeData } from "@/interfaces/income";

const generateButton = (column: Column<MappedIncomeData, unknown>, label: string) => (
   <button
      className='flex items-center py-4 font-semibold text-neutral-700 dark:text-white/60 hover:text-neutral-600/90 dark:hover:text-gray-400/70'
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
   >
      {label}
      <ArrowUpDown className='ml-2 h-4 w-4' />
   </button>
);

export const columns: ColumnDef<MappedIncomeData>[] = [
   {
      accessorKey: "date",
      header: ({ column }) => generateButton(column, "Date"),
   },
   {
      accessorKey: "source",
      header: ({ column }) => generateButton(column, "Source"),
   },
   {
      accessorKey: "income",
      header: ({ column }) => generateButton(column, "Amount"),
      cell: ({ row }) => {
         const amount = parseFloat(row.getValue("income"));
         const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
         }).format(amount);

         return <div className='font-medium'>{formatted}</div>;
      },
   },
   {
      accessorKey: "regular",
      header: ({ column }) => generateButton(column, "Regular"),
      cell: ({ row }) => {
         return (
            <div className='pl-4 py-2 md:pl-6'>
               {row.getValue("regular") ? (
                  <Check
                     size={18}
                     className='text-emerald-400'
                  />
               ) : (
                  <X
                     size={18}
                     className='text-rose-500'
                  />
               )}
            </div>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const { toast } = useToast();
         const income = row.original;
         const {
            deleteIncome: { mutate },
         } = useIncomes();

         const copyId = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            handleCopy(income.id);
            toast({
               title: "Copied!",
               description: "Income ID copied to clipboard.",
            });
         };

         return (
            <div className='text-right'>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'
                     >
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuItem>View income details</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={copyId}>Copy income ID</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={(e) => handleDeleteTransaction(e, mutate, income.id)}
                     >
                        Delete income
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         );
      },
   },
];
