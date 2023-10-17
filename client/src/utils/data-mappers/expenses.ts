import { formatDate } from "../format-date";
import { Expense, MappedExpenseData } from "@/interfaces/expense";

const mapExpensesData = (data: Expense[]): MappedExpenseData[] => {
   return data.map((expense: Expense) => {
      const { name, amount, date, regular, category, _id } = expense;
      const formattedDate = formatDate(date, "MM-dd-yyyy");

      return {
         name,
         date: formattedDate,
         expense: amount,
         regular,
         category,
         id: _id,
      };
   });
};

export { mapExpensesData };
