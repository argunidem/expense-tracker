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
import { handleCopy } from "@/utils/handlers/handle-copy";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { MappedBudgetData } from "@/interfaces/budget";
import { cn } from "@/utils/cn";
import { useToast } from "@/hooks/use-toast";

const generateButton = (column: Column<MappedBudgetData, unknown>, label: string) => (
   <button
      className='flex items-center py-4 font-semibold text-neutral-700 dark:text-white/60 hover:text-neutral-600/90 dark:hover:text-gray-400/70'
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
   >
      {label}
      <ArrowUpDown className='ml-2 h-4 w-4' />
   </button>
);

export const columns: ColumnDef<MappedBudgetData>[] = [
   {
      accessorKey: "date",
      header: ({ column }) => generateButton(column, "Month"),
      cell: ({ row }) => {
         return <div className='font-medium'>{row.getValue("date")}</div>;
      },
   },
   {
      accessorKey: "balance",
      header: ({ column }) => generateButton(column, " Balance"),
      cell: ({ row }) => {
         const balance = row.original.balance;
         const isNegative = balance < 0;
         const amount = isNegative ? balance.toString().slice(1) : balance.toString();

         return (
            <div
               className={cn(
                  "font-medium text-center xl:mx-auto 2xl:text-left",
                  balance === 0 ? "text-white" : isNegative ? "text-rose-400" : "text-emerald-600"
               )}
            >
               {isNegative ? "-" : ""}${amount}
            </div>
         );
      },
   },
   {
      accessorKey: "income",
      header: ({ column }) => generateButton(column, "Total Income"),
      cell: ({ row }) => {
         return (
            <div className='font-medium text-center xl:mx-auto 2xl:text-left'>
               ${row.getValue("income")}
            </div>
         );
      },
   },
   {
      accessorKey: "expense",
      header: ({ column }) => generateButton(column, "Total Expense"),
      cell: ({ row }) => {
         return (
            <div className='font-medium text-center xl:mx-auto 2xl:text-left'>
               ${row.getValue("expense")}
            </div>
         );
      },
   },
   {
      accessorKey: "transactions",
      header: ({ column }) => generateButton(column, "Number of Transactions"),
      cell: ({ row }) => {
         const transactions = row.original.transactions;
         return (
            <div className='font-medium text-center xl:mx-auto 2xl:text-left'>
               {transactions.incomes.length + transactions.expenses.length}
            </div>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const { toast } = useToast();
         const budget = row.original;

         const copyId = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            handleCopy(budget._id);
            toast({
               title: "Copied!",
               description: "Budget ID copied to clipboard.",
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
                     <DropdownMenuItem>View budget details</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={copyId}>Copy budget ID</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         );
      },
   },
];
