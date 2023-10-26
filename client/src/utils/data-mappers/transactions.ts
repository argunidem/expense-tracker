import { formatDate } from "../format-date";
import { Expense } from "@/interfaces/expense";
import { Income } from "@/interfaces/income";
import { TransactionData } from "@/interfaces/transaction";

const mapTransactionsData = (data: Expense[] | Income[]): TransactionData[] => {
   return data.map((transaction: Expense | Income) => {
      const transactionType = "category" in transaction ? "expense" : "income";
      const formattedDate = formatDate(transaction.date, "MM-dd-yyyy");

      return {
         ...(({ amount, _id: id, ...rest }) => ({ id, ...rest }))(transaction),
         date: formattedDate,
         [transactionType]: transaction.amount,
      };
   });
};

export { mapTransactionsData };
