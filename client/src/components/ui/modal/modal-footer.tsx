"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleCopy } from "@/utils/handlers/handle-copy";
import { CheckCircle, Copy } from "lucide-react";

interface ModalFooterProps {
   title: string;
   id: string;
}

const ModalFooter = ({ title, id }: ModalFooterProps) => {
   const [isCopied, setIsCopied] = useState(false);
   const { toast } = useToast();

   const copyId = () => {
      handleCopy(id as string);
      setIsCopied(true);
      toast({
         title: "Copied!",
         description: `${title} ID copied to clipboard.`,
      });
      setTimeout(() => {
         setIsCopied(false);
      }, 3000);
   };

   return (
      <div className='flex justify-center items-center gap-x-3 font-light text-sm text-center'>
         <p className='text-neutral-400'>
            <span>Budget ID: </span>
            <span className='text-neutral-500/80'>{id}</span>
         </p>
         <button onClick={copyId}>
            {isCopied ? (
               <CheckCircle
                  size={18}
                  className='transition-all duration-300 text-emerald-400'
               />
            ) : (
               <Copy
                  size={18}
                  className='transition-all duration-300 text-neutral-400'
               />
            )}
         </button>
      </div>
   );
};

export default ModalFooter;
