import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
   "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:disabled:opacity-30 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
   {
      variants: {
         variant: {
            primary:
               "p-1.5 rounded-md font-medium bg-white text-gray-700 transition-all dark:bg-transparent dark:hover:bg-zinc-800 dark:text-neutral-300 dark:hover:text-white hover:bg-gray-50",
            default: "bg-gray-100 text-neutral-700/90 hover:bg-transparent hover:text-neutral-300",
            destructive:
               "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
            outline: "bg-transparent text-neutral-300 hover:bg-gray-100 hover:text-neutral-700/90",
            secondary:
               "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
            ghost: "hover:bg-gray-500/10 hover:text-neutral-700 dark:hover:bg-gray-500/10 dark:hover:text-slate-50",
            link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
            auth: "font-semibold bg-gray-600/70 text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center dark:bg-gray-600/60 hover:bg-gray-600/60 dark:hover:bg-gray-600/40",
         },
         size: {
            default: "h-10 px-4",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
            auto: "h-auto w-auto",
            none: "",
         },
         border: {
            default: "border dark:border-neutral-700",
            neutral: "border border-neutral-500/50",
            "light-only": "border border-neutral-500/50 dark:border-none",
            none: "border-0",
         },
         shadow: {
            none: "shadow-none",
            default: "dark:shadow-white/20 hover:shadow-md",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
         border: "none",
         shadow: "none",
      },
   }
);

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, border, shadow, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return (
         <Comp
            className={cn(buttonVariants({ variant, size, border, shadow, className }))}
            ref={ref}
            {...props}
         />
      );
   }
);
Button.displayName = "Button";

export { Button, buttonVariants };
