import BarChart from "@/components/ui/charts/bar-chart";
import LineChart from "@/components/ui/charts/line-chart";
import PieChart from "@/components/ui/charts/pie-chart";

const DashboardCharts = () => {
   return (
      <div className='grid grid-cols-1 sm:my-12 2xl:grid-cols-2'>
         <BarChart />
         <LineChart />
         <PieChart />
         <PieChart />
      </div>
   );
};

export default DashboardCharts;
