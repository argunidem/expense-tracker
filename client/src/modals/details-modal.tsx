"use client";

import React from "react";
import Modal from "./base-modal";
import ModalField from "@/components/ui/modal/modal-field";
import ModalFooter from "@/components/ui/modal/modal-footer";
import { useModal, useDetails } from "@/hooks/store";
import { useTransactions } from "@/hooks/query/use-transactions";
import { handleDeleteTransaction } from "@/utils/handlers/handle-delete";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, X } from "lucide-react";
import { Transaction } from "@/interfaces/transaction";
import { MappedBudgetData } from "@/interfaces/budget";

interface BodyContainerProps {
   children: React.ReactNode;
   title: string;
   id?: string;
   toggleModal?: () => void;
}

const BodyContainer = ({ children, title, id }: BodyContainerProps) => {
   const { toggleModal } = useModal();
   const {
      deleteTransaction: { mutate },
   } = useTransactions();

   return (
      <div className='max-w-xl mx-auto flex flex-col gap-4 md:w-full'>
         <div className='flex justify-between items-center'>
            <h3 className='text-xl font-bold'>{title} Details</h3>
            {id && (
               <div className='flex flex-col items-start gap-y-1'>
                  <Tooltip>
                     <TooltipTrigger>
                        <div
                           className='transition-colors duration-300 text-sm underline-offset-2 text-slate-300 underline cursor-pointer hover:text-slate-400'
                           onClick={() => toggleModal("update")}
                        >
                           Edit {title}
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p className='py-2 px-4'>Edit this {title.toLowerCase()}</p>
                     </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                     <TooltipTrigger>
                        <div
                           className='transition-colors duration-300 text-sm underline-offset-2 text-rose-500 underline cursor-pointer hover:text-rose-700'
                           onClick={(e) => {
                              handleDeleteTransaction(e, mutate, id);
                              setTimeout(() => {
                                 toggleModal();
                              }, 700);
                           }}
                        >
                           Delete {title}
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p className='py-2 px-4'>
                           Are you sure you want to delete this {title.toLowerCase()}?
                        </p>
                     </TooltipContent>
                  </Tooltip>
               </div>
            )}
         </div>
         <div className='px-1 space-y-0.5'>{children}</div>
      </div>
   );
};

const DetailsModal = () => {
   let title = "";
   let bodyContent = null;
   const { isOpen, modal, toggleModal } = useModal();
   const { data } = useDetails();

   if (data?.key === "transaction") {
      const { type, name, description, amount, category, date, regular, expiresAt, _id } =
         data.value as Transaction;
      title = type.charAt(0).toUpperCase() + type.slice(1);

      bodyContent = (
         <BodyContainer
            title={title}
            id={_id}
            toggleModal={toggleModal}
         >
            {name && <ModalField value={name} />}
            {description && (
               <ModalField
                  label={`${title} Info`}
                  value={description}
               />
            )}
            {amount && (
               <ModalField
                  label={`${title} amount`}
                  value={`$${amount}`}
               />
            )}
            <ModalField
               label={`${title} category`}
               value={category.name}
            />
            <ModalField
               label={"Transaction date"}
               value={date}
            />
            <ModalField
               label={"Regular"}
               value={
                  regular ? (
                     <Check
                        size={18}
                        className='text-emerald-400 mt-0.5'
                     />
                  ) : (
                     <X
                        size={18}
                        className='text-red-400 mt-0.5'
                     />
                  )
               }
            />
            {expiresAt && (
               <ModalField
                  label={"Expires at"}
                  value={expiresAt}
               />
            )}
         </BodyContainer>
      );
   } else if (data?.key === "budget") {
      const { name, expense, income, balance, transactions } = data.value as MappedBudgetData;
      title = "Budget";
      const fields = [
         { label: "Budget period", value: name },
         { label: "Total income", value: `$${income}` },
         { label: "Total expense", value: `$${expense}` },
         { label: "Balance", value: `$${balance}` },
      ];
      bodyContent = (
         <BodyContainer title={title}>
            {fields.map((field) => (
               <ModalField
                  key={field.label}
                  label={field.label}
                  value={field.value}
               />
            ))}
            <div className='flex flex-col space-y-1'>
               <h4 className='text-neutral-700 dark:text-neutral-200'>Incomes</h4>
               {transactions?.incomes.map((income) => (
                  <React.Fragment key={income._id}>
                     <div className='pl-4'>
                        <ModalField
                           label={income.date}
                           value={`$${income.amount}`}
                        />
                     </div>
                  </React.Fragment>
               ))}
               <h4 className='text-neutral-700 dark:text-neutral-200'>Expenses</h4>
               {transactions?.expenses.map((expense) => (
                  <React.Fragment key={expense._id}>
                     <div className='pl-4'>
                        <ModalField
                           label={expense.date}
                           value={`$${expense.amount}`}
                        />
                     </div>
                  </React.Fragment>
               ))}
            </div>
         </BodyContainer>
      );
   }

   return (
      <Modal
         isOpen={isOpen && modal === "details"}
         title={title}
         onClose={toggleModal}
         body={bodyContent}
         footer={
            <ModalFooter
               title={title}
               id={data?.value._id || ""}
            />
         }
      />
   );
};

export default DetailsModal;
