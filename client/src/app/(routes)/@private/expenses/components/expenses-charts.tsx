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
            color={{ dark: "#938348", light: "#ac984e" }}
            dataKeys={{ bar: "expense" }}
            tooltipText={"Expense"}
         />
         {/* Expenses by month */}
         <SingleBarChart
            data={budgetData}
            color={{ default: "#4e68a0" }}
            dataKeys={{ bar: "expense" }}
            tooltipText={"Total expense"}
         />
         {/* Expenses and incomes comparison */}
         <DoubleLineChart data={budgetData} />
         <PieChart />
      </div>
   );
};

export default ExpensesCharts;
