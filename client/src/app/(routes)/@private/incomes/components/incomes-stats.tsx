import StatsContainer from "@/components/ui/stats/stats-container";
import StatsBox from "@/components/ui/stats/stats-box";

const IncomesStats = () => {
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

export default IncomesStats;