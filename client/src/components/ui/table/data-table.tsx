"use client";

import { useState } from "react";
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table/table";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { cn } from "@/utils/cn";
import useModal from "@/hooks/store/use-modal";
import useDetails from "@/hooks/store/use-details";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   searchBy?: string;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   searchBy,
}: DataTableProps<TData, TValue>) {
   const { toggleModal } = useModal();
   const { setData } = useDetails();

   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
      },
   });

   const handleClick = (e: any) => {
      setData(e, searchBy ? "transaction" : "budget");
      toggleModal("details");
   };

   return (
      <>
         <div className='flex flex-col-reverse items-center gap-y-4 py-4 sm:flex-row'>
            {searchBy && (
               <Input
                  placeholder={`Filter by ${searchBy}...`}
                  value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                     table.getColumn(searchBy)?.setFilterValue(event.target.value)
                  }
                  className='max-w-sm bg-transparent'
               />
            )}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant='ghost'
                     border={"default"}
                     className='ml-auto dark:border-gray-600/50'
                  >
                     Columns
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align='end'>
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className='capitalize'
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) => column.toggleVisibility(!!value)}
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        );
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className='rounded-md border dark:border-gray-600/50'>
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow
                        key={headerGroup.id}
                        className='dark:border-gray-600/50 dark:hover:bg-gray-500/5'
                     >
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                           onClick={() => handleClick(row.original)}
                           className='dark:border-gray-600/30 dark:hover:bg-gray-500/5'
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className='h-24 text-center'
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         {table.getCanNextPage() && (
            <div className='flex items-center justify-end space-x-2 py-4'>
               <Button
                  variant='ghost'
                  size='sm'
                  border={table.getCanPreviousPage() ? "light-only" : "default"}
                  className={cn(
                     "px-5",
                     table.getCanPreviousPage() &&
                        "text-neutral-600 dark:text-gray-300 dark:bg-gray-600/20 hover:border-transparent"
                  )}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  Previous
               </Button>
               <Button
                  variant='ghost'
                  size='sm'
                  border={table.getCanNextPage() ? "light-only" : "default"}
                  className={cn(
                     "px-10",
                     table.getCanNextPage() &&
                        "text-neutral-600 dark:text-gray-300 dark:bg-gray-600/20 hover:border-transparent"
                  )}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  Next
               </Button>
            </div>
         )}
      </>
   );
}
