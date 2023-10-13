import StatsContainer from "@/components/ui/stats/stats-container";
import StatsBox from "@/components/ui/stats/stats-box";

const ExpensesStats = () => {
   return (
      <StatsContainer>
         <StatsBox
            label='Total Expense'
            value={200}
         />
         <StatsBox
            label='Total Expense'
            value={200}
         />
         <StatsBox
            label='Total Expense'
            value={200}
         />
      </StatsContainer>
   );
};

export default ExpensesStats;
