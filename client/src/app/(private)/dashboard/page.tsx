import DashboardHeader from "@/components/sections/dashboard/dashboard-header";
import DashboardStats from "@/components/sections/dashboard/dashboard-stats";
import DashboardCharts from "@/components/sections/dashboard/dashboard-charts";
import DashboardTable from "@/components/sections/dashboard/dashboard-table";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
   return (
      <section className='ml-20 my-10 sm:px-6 lg:ml-0 lg:w-[calc(100%-280px)]'>
         <DashboardHeader />
         <Separator className='my-4' />
         <DashboardStats />
         <Separator className='my-4' />
         <DashboardCharts />
         <Separator className='my-4' />
         <DashboardTable />
      </section>
   );
};

export default Dashboard;
