import IncomesHeader from "./components/incomes-header";
import IncomesStats from "./components/incomes-stats";
import IncomesCharts from "./components/incomes-charts";
import IncomesTable from "./components/table/incomes-table";
import { Separator } from "@/components/ui/separator";

const IncomesPage = () => {
   return (
      <>
         <IncomesHeader />
         <Separator className='my-4' />
         <IncomesStats />
         <Separator className='my-4' />
         <IncomesCharts />
         <Separator className='my-4' />
         <IncomesTable />
      </>
   );
};

export default IncomesPage;
