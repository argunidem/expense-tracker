import DoubleBarChart from "@/components/ui/charts/double-bar-charts";
import PieChart from "@/components/ui/charts/pie-chart";
import SingleBarChart from "@/components/ui/charts/single-bar-chart";
import { mapPieChartData } from "@/utils/data-mappers/budget";
import { MappedBudgetData } from "@/interfaces/budget";

interface BudgetChartsProps {
   budgetData: MappedBudgetData[];
}

const BudgetCharts = ({ budgetData }: BudgetChartsProps) => {
   const { totalChartData, currentMonthData } = mapPieChartData(budgetData);

   return (
      <div className='grid grid-cols-1 sm:my-12 2xl:grid-cols-2'>
         {/* Budgets */}
         <SingleBarChart
            data={budgetData}
            color={{ default: "#4e68a0" }}
            dataKeys={{ bar: "balance" }}
            title={"Balance by month"}
         />
         {/* Expenses and incomes comparison */}
         <DoubleBarChart
            data={budgetData}
            title={"Transaction comparison"}
         />
         {/* Transaction type comparison */}
         <PieChart
            data={totalChartData || []}
            title={"Transaction type comparison"}
         />
         {/* Current month's transaction type comparison */}
         <PieChart
            data={currentMonthData || []}
            title={"Current month's comparison"}
         />
      </div>
   );
};

export default BudgetCharts;
