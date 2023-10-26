"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useModal } from "@/hooks/store";
import { cn } from "@/utils/cn";
import { Plus } from "lucide-react";

interface CreateTransactionProps {
   title?: string;
   locatedIn: string;
}

const CreateTransaction = ({ title, locatedIn }: CreateTransactionProps) => {
   const { toggleModal } = useModal();

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>
               <div
                  onClick={() => toggleModal("transaction")}
                  className={cn(
                     "flex gap-x-1 transition-all duration-200 bg-transparent text-gray-700 dark:text-gray-300/90 rounded-md border border-gray-300 dark:border-gray-600/50 hover:bg-gray-200/40 dark:hover:bg-gray-200 hover:text-neutral-700/90 dark:hover:text-neutral-900",
                     locatedIn === "Header"
                        ? "px-4 py-2 sm:px-9 sm:py-3 sm:hover:px-12 xl:hover:px-14 xl:px-12 xl:tracking-widest xl:font-semibold"
                        : "py-1.5 px-2 lg:px-4 lg:py-2 lg:dark:border-gray-700/70 xl:px-5"
                  )}
               >
                  <span className={cn(locatedIn === "Header" ? "inline" : "hidden lg:inline")}>
                     {locatedIn === "Header" ? "New" : "Add New"}
                  </span>
                  <span className={cn(locatedIn === "Header" ? "-mr-1" : "lg:-mr-1")}>
                     <Plus className='p-0.5' />
                  </span>
               </div>
            </TooltipTrigger>
            <TooltipContent>
               <p className='py-2 px-4'>Add a new {title?.toLowerCase() || "transaction"}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default CreateTransaction;
