import BudgetCharts from "@/components/sections/private/budget/budget-charts";
import TransactionCharts from "@/components/sections/private/transaction/transaction-charts";
import { MappedBudgetData } from "@/interfaces/budget";
import { Transaction } from "@/interfaces/transaction";

interface HomeChartsProps {
   budgetData: MappedBudgetData[];
   transactionData:
      | {
           incomes: Transaction[];
           expenses: Transaction[];
        }
      | undefined;
}

const HomeCharts = ({ budgetData, transactionData }: HomeChartsProps) => {
   return (
      <>
         <BudgetCharts budgetData={budgetData || []} />
         <TransactionCharts
            transactionData={transactionData?.incomes || []}
            budgetData={budgetData}
            transactionType={"income"}
         />
         <TransactionCharts
            transactionData={transactionData?.expenses || []}
            budgetData={budgetData}
            transactionType={"expense"}
         />
      </>
   );
};

export default HomeCharts;
