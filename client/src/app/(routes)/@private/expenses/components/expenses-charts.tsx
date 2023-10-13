import SingleBarChart from "@/components/ui/charts/single-bar-chart";
import DoubleLineChart from "@/components/ui/charts/double-line-chart";
import PieChart from "@/components/ui/charts/pie-chart";
import { ExpenseTableData, ExpensesComparison, MappedExpense } from "@/interfaces/expense";

interface ExpensesChartsProps {
   expensesChartData: MappedExpense[];
   monthlyData: MappedExpense[];
   comparisonData: ExpensesComparison[];
}

const ExpensesCharts = ({
   expensesChartData,
   monthlyData,
   comparisonData,
}: ExpensesChartsProps) => {
   return (
      <div className='grid grid-cols-1 sm:my-12 2xl:grid-cols-2'>
         {/* Latest expenses */}
         <SingleBarChart
            data={expensesChartData}
            color={"#938348"}
            dataKeys={{ bar: "expense" }}
            customName={"Expense"}
         />
         {/* Expenses by month */}
         <SingleBarChart
            data={monthlyData}
            color={"#4e68a0"}
            dataKeys={{ bar: "expense" }}
            customName={"Total expense"}
         />
         {/* Expenses and incomes comparison */}
         <DoubleLineChart data={comparisonData} />
         <PieChart />
      </div>
   );
};

export default ExpensesCharts;
