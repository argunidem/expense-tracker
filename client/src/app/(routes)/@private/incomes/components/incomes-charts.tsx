import SingleBarChart from "@/components/ui/charts/single-bar-chart";
import DoubleLineChart from "@/components/ui/charts/double-line-chart";
import PieChart from "@/components/ui/charts/pie-chart";
import { MappedIncomeData } from "@/interfaces/income";
import { MappedBudgetData } from "@/interfaces/budget";

interface IncomesChartsProps {
   incomesChartData: MappedIncomeData[];
   budgetData: MappedBudgetData[];
}

const IncomesCharts = ({ incomesChartData, budgetData }: IncomesChartsProps) => {
   return (
      <div className='grid grid-cols-1 sm:my-12 2xl:grid-cols-2'>
         {/* Latest incomes */}
         <SingleBarChart
            data={incomesChartData}
            color={{ dark: "#37885c", light: "#42a87d" }}
            dataKeys={{ bar: "income" }}
            customName={"Income"}
         />
         {/* Incomes by month */}
         <SingleBarChart
            data={budgetData}
            color={{ default: "#4e68a0" }}
            dataKeys={{ bar: "income" }}
            customName={"Total income"}
         />
         {/* Expenses and incomes comparison */}
         <DoubleLineChart data={budgetData} />
         <PieChart />
      </div>
   );
};

export default IncomesCharts;
