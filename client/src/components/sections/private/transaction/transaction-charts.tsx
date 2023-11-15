import SingleBarChart from "@/components/ui/charts/single-bar-chart";
import DoubleLineChart from "@/components/ui/charts/double-line-chart";
import PieChart from "@/components/ui/charts/pie-chart";
import { MappedBudgetData } from "@/interfaces/budget";
import { Transaction } from "@/interfaces/transaction";
import { useCategories } from "@/hooks/query/use-categories";

interface TransactionChartsProps {
   transactionData: Transaction[];
   budgetData: MappedBudgetData[];
   transactionType: "expense" | "income";
}

const TransactionCharts = ({
   transactionData,
   budgetData,
   transactionType,
}: TransactionChartsProps) => {
   const {
      getCategories: { data: categories },
   } = useCategories();

   const pieChartData = categories
      ?.map((category) => ({
         name: category.name,
         amount: category.transactions[
            transactionType === "expense" ? "expenses" : "incomes"
         ].reduce((acc, transaction) => acc + transaction.amount, 0),
      }))
      .filter((category) => category.amount > 0);

   return (
      <div className='grid grid-cols-1 sm:my-12 2xl:grid-cols-2'>
         {/* Latest transactions */}
         <SingleBarChart
            data={transactionData}
            color={{ dark: "#37885c", light: "#42a87d" }}
            dataKeys={{ bar: "amount" }}
            tooltipText={transactionType.replace(
               transactionType[0],
               transactionType[0].toUpperCase()
            )}
         />
         {/* Transactions by month */}
         <SingleBarChart
            data={budgetData}
            color={{ default: "#4e68a0" }}
            dataKeys={{ bar: transactionType }}
            tooltipText={`Total ${transactionType}`}
         />
         {/* Expenses and incomes comparison */}
         <DoubleLineChart data={budgetData} />
         {/* Category comparison */}
         <PieChart data={pieChartData || []} />
      </div>
   );
};

export default TransactionCharts;
