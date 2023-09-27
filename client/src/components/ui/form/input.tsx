import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(
               "w-full max-w-xs px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-neutral-500 text-sm focus:outline-none focus:border-gray-400 dark:border-neutral-800 dark:bg-transparent dark:focus:border-neutral-700",
               className
            )}
            ref={ref}
            {...props}
         />
      );
   }
);
Input.displayName = "Input";

export { Input };
