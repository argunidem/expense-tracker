import { formatDate } from "./format-date";
import { Expense, ExpenseTableData, ExpensesComparison, MappedExpense } from "@/interfaces/expense";
import { Budget } from "@/interfaces/budget";

//! Prepare data for Expenses & Incomes Comparison Chart
const calculateExpensesComparison = (data: Budget[]): ExpensesComparison[] => {
   return data.map(({ name, month, transactions: { expenses, incomes } }: Budget) => {
      const totalIncome = incomes.reduce(
         (acc: number, cur: { amount: number }) => acc + cur.amount,
         0
      );
      const totalExpense = expenses.reduce(
         (acc: number, cur: { amount: number }) => acc + cur.amount,
         0
      );

      return {
         name,
         month,
         expense: totalExpense,
         income: totalIncome,
      };
   });
};

//! Prepare data for Monthly Expenses Chart
const calculateMonthlyExpenses = (data: Budget[]): MappedExpense[] => {
   return data.map(({ name, month, transactions: { expenses } }: Budget) => {
      const totalExpense = expenses.reduce((acc: number, cur: { amount: number }) => {
         return acc + cur.amount;
      }, 0);

      const formattedDate = formatDate(month, "MM-yyyy");

      return {
         name,
         date: formattedDate,
         expense: totalExpense,
      };
   });
};

//! Prepare data for All Expenses Chart
const calculateAllExpenses = (data: Expense[]): MappedExpense[] => {
   const allExpenses = data.map(({ name, date, amount }: Expense) => {
      const formattedDate = formatDate(date, "MM-dd-yyyy");

      return {
         name: name,
         date: formattedDate,
         expense: amount,
      };
   });
   return sortExpensesByDate(allExpenses);
};

//! Prepare data for Expenses Table
const mapTableData = (data: Expense[]): ExpenseTableData[] => {
   const allExpenses = data.map((expense: Expense) => {
      const { amount, date, regular, category, _id } = expense;

      const formattedDate = formatDate(date, "MM-dd-yyyy");

      return {
         amount,
         date: formattedDate,
         regular,
         category,
         id: _id,
      };
   });

   return sortExpensesByDate(allExpenses);
};

const sortExpensesByDate = (data: any[]) => {
   type ItemType = MappedExpense | ExpenseTableData;
   return data?.sort((a: ItemType, b: ItemType) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
   });
};

export {
   calculateExpensesComparison,
   calculateMonthlyExpenses,
   calculateAllExpenses,
   mapTableData,
};
