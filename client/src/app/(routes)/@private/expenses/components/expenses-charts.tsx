import SingleBarChart from "@/components/ui/charts/single-bar-chart";
import DoubleLineChart from "@/components/ui/charts/double-line-chart";
import PieChart from "@/components/ui/charts/pie-chart";
import { MappedExpenseData } from "@/interfaces/expense";
import { MappedBudgetData } from "@/interfaces/budget";

interface ExpensesChartsProps {
   expensesChartData: MappedExpenseData[];
   budgetData: MappedBudgetData[];
}

const ExpensesCharts = ({ expensesChartData, budgetData }: ExpensesChartsProps) => {
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
            data={budgetData}
            color={"#4e68a0"}
            dataKeys={{ bar: "expense" }}
            customName={"Total expense"}
         />
         {/* Expenses and incomes comparison */}
         <DoubleLineChart data={budgetData} />
         <PieChart />
      </div>
   );
};

export default ExpensesCharts;
