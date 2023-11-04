"use client";

import { TooltipProvider as Provider } from "@/components/ui/tooltip";

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
   return <Provider delayDuration={400}>{children}</Provider>;
};
