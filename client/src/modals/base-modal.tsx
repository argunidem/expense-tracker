"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
   isOpen?: boolean;
   onClose: () => void;
   title?: string;
   body?: React.ReactNode;
   footer?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, body, footer }: ModalProps) => {
   const [showModal, setShowModal] = useState(isOpen);

   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]);

   const handleClose = () => {
      setShowModal(false);
      setTimeout(() => {
         onClose();
      }, 300);
   };

   if (!isOpen) {
      return null;
   }

   return (
      <>
         <div className='justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-950/70'>
            <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 max-w-3xl mx-auto h-full lg:h-auto md:h-auto'>
               {/*content*/}
               <div
                  className={`translate duration-300 h-full ${
                     showModal ? "translate-y-0" : "translate-y-full"
                  } ${showModal ? "opacity-100" : "opacity-0"}`}
               >
                  <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-[rgba(16,16,16,95%)] dark:border dark:border-gray-600/10'>
                     {/*header*/}
                     <div className='flex items-center p-6 rounded-t justify-center relative border-b dark:border-gray-500/30 dark:bg-[rgba(14,14,14,95%)]'>
                        <button
                           className='p-1 border-0 hover:opacity-70 transition absolute right-5 '
                           onClick={handleClose}
                        >
                           <X size={18} />
                        </button>
                        <div className='text-lg font-semibold'>{title}</div>
                     </div>
                     {/*body*/}
                     <div className='relative flex items-center p-6 flex-auto'>{body}</div>
                     {/*footer*/}
                     {footer && (
                        <div className='p-6 border-t dark:border-gray-500/30'>{footer}</div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Modal;
