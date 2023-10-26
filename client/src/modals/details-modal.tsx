"use client";

import React from "react";
import Modal from "./base-modal";
import ModalField from "@/components/ui/modal/modal-field";
import ModalFooter from "@/components/ui/modal/modal-footer";
import { useModal, useDetails } from "@/hooks/store";
import { Check, X } from "lucide-react";
import { TransactionData } from "@/interfaces/transaction";
import { MappedBudgetData } from "@/interfaces/budget";

interface BodyContainerProps {
   children: React.ReactNode;
   title: string;
}

const BodyContainer = ({ children, title }: BodyContainerProps) => {
   return (
      <div className='flex flex-col gap-4'>
         <h3 className='text-xl font-bold'>{title} Details</h3>
         <div className='px-1 space-y-0.5'>{children}</div>
      </div>
   );
};

const DetailsModal = () => {
   let title = "";
   let bodyContent = null;
   const { isOpen, modal, toggleModal } = useModal();
   const { data } = useDetails();

   if (!data) return null;
   const { key, value } = data;

   if (key === "transaction") {
      const { name, description, expense, income, category, source, date, regular, expiresAt } =
         value as TransactionData;
      title = expense ? "Expense" : "Income";

      bodyContent = (
         <BodyContainer title={title}>
            {name && <ModalField value={name} />}
            {description && (
               <ModalField
                  label={`${title} Info`}
                  value={description}
               />
            )}
            {(expense || income) && (
               <ModalField
                  label={`${title} amount`}
                  value={`$${expense ? expense : income}`}
               />
            )}
            <ModalField
               label={expense ? "Expense category" : "Income source"}
               value={expense ? category : source}
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
   } else if (key === "budget") {
      const { name, expense, income, balance, transactions } = value as MappedBudgetData;
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
               {transactions.incomes.map((income) => (
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
               {transactions.expenses.map((expense) => (
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
         isOpen={modal === "details" && isOpen}
         title={title}
         onClose={toggleModal}
         body={bodyContent}
         footer={
            <ModalFooter
               title={title}
               id={data.value.id}
            />
         }
      />
   );
};

export default DetailsModal;
