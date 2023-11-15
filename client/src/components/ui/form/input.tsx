import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(
               "w-full max-w-xs px-6 py-4 rounded-lg font-medium bg-transparent border border-gray-200 hover:border-gray-300 placeholder-neutral-500 text-sm focus:outline-none focus:border-gray-400 dark:border-gray-600/50 hover:dark:border-gray-600/60 dark:bg-transparent dark:focus:border-gray-600/70",
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
