import IncomesHeader from "@/components/ui/header";
import IncomesDashboard from "./components/incomes-dashboard";
import { Separator } from "@/components/ui/separator";

const IncomesPage = () => {
   return (
      <>
         <IncomesHeader title={"Incomes"} />
         <Separator className='my-4' />
         <IncomesDashboard />
      </>
   );
};

export default IncomesPage;
