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
} from "@/components/ui/tables/table";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { cn } from "@/utils/cn";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
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

   return (
      <>
         <div className='flex flex-col-reverse items-center gap-y-4 py-4 sm:flex-row'>
            <Input
               placeholder='Filter by category...'
               value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
               onChange={(event) => table.getColumn("category")?.setFilterValue(event.target.value)}
               className='max-w-sm bg-transparent'
            />
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
