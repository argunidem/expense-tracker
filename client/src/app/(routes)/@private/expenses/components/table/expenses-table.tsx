import { MappedExpenseData } from "@/interfaces/expense";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/tables/data-table";

const ExpensesTable = ({ data }: { data: MappedExpenseData[] }) => {
   return (
      <div className='mt-8 px-4 xl:mx-12 2xl:mx-40'>
         <DataTable
            columns={columns}
            data={data}
         />
      </div>
   );
};

export default ExpensesTable;
