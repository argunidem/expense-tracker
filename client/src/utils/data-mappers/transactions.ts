import { formatDate } from "../format-date";
import { Expense } from "@/interfaces/expense";
import { Income } from "@/interfaces/income";
import { TransactionData } from "@/interfaces/transaction";

const mapTransactionsData = (data: Expense[] | Income[]): TransactionData[] => {
   return data.map((transaction: Expense | Income) => {
      const { name, amount, date, regular, _id } = transaction;
      const formattedDate = formatDate(date, "MM-dd-yyyy");

      const mappedTransaction: TransactionData = {
         name,
         date: formattedDate,
         regular,
         id: _id,
      };

      if ("category" in transaction) {
         mappedTransaction.expense = amount;
         mappedTransaction.category = transaction.category;
      }

      if ("source" in transaction) {
         mappedTransaction.income = amount;
         mappedTransaction.source = transaction.source;
      }

      return mappedTransaction;
   });
};

export { mapTransactionsData };
