import BarChart from "@/components/ui/charts/bar-chart";
import LineChart from "@/components/ui/charts/line-chart";

const DashboardCharts = () => {
   return (
      <div className='flex justify-evenly flex-wrap sm:my-12 2xl:flex-nowrap'>
         <BarChart />
         <LineChart />
      </div>
   );
};

export default DashboardCharts;
