import DashboardHeader from "./components/dashboard-header";
import DashboardStats from "./components/dashboard-stats";
import DashboardCharts from "./components/dashboard-charts";
import DashboardTable from "./components/table/dashboard-table";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
   return (
      <>
         <DashboardHeader />
         <Separator className='my-4' />
         <DashboardStats />
         <Separator className='my-4' />
         <DashboardCharts />
         <Separator className='my-4' />
         <DashboardTable />
      </>
   );
};

export default DashboardPage;
