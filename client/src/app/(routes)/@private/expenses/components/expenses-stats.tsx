import StatsContainer from "@/components/ui/stats/stats-container";
import StatsBox from "@/components/ui/stats/stats-box";
import { MappedBudgetData } from "@/interfaces/budget";

interface ExpensesStatsProps {
   data: MappedBudgetData[];
}

const ExpensesStats = ({ data }: ExpensesStatsProps) => {
   const totalExpense = data.reduce((acc, curr) => acc + curr.expense, 0);
   const currentMonthExpense = data.slice(-1)[0].expense;

   return (
      <StatsContainer>
         <StatsBox
            label='Total Expense'
            value={totalExpense}
            tooltip="Total amount of money you've spent so far."
         />
         <StatsBox
            label='This Month'
            value={currentMonthExpense}
            tooltip="Total amount of money you've spent this month."
         />
         <StatsBox
            label='Monthly Average'
            value={totalExpense / data.length}
            tooltip="Average amount of money you've spent per month."
         />
      </StatsContainer>
   );
};

export default ExpensesStats;
