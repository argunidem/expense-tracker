import IncomesHeader from "@/components/ui/header";
import TransactionDashboard from "@/components/sections/private/transaction/transaction-dashboard";
import { Separator } from "@/components/ui/separator";

const IncomesPage = () => {
   return (
      <>
         <IncomesHeader title={"Incomes"} />
         <Separator className='my-4' />
         <TransactionDashboard transactionType={"income"} />
      </>
   );
};

export default IncomesPage;
