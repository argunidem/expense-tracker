import DashboardHeader from "@/components/ui/header";
import DashboardCharts from "./components/dashboard-charts";
import DashboardTable from "./components/table/dashboard-table";
import { Separator } from "@/components/ui/separator";
import StatsContainer from "@/components/ui/stats/stats-container";

const DashboardPage = () => {
   return (
      <>
         <DashboardHeader title={"Dashboard"} />
         <Separator className='my-4' />
         <StatsContainer data={[]} />
         <Separator className='my-4' />
         <DashboardCharts />
         <Separator className='my-4' />
         <DashboardTable />
      </>
   );
};

export default DashboardPage;
