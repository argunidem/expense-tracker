import { ExpenseTableData } from "@/interfaces/expense";
import { columns } from "./columns";
import { data } from "./data";
import { DataTable } from "@/components/ui/tables/data-table";

interface ExpensesTableProps {
   data: ExpenseTableData[];
}

const ExpensesTable = ({ data }: ExpensesTableProps) => {
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
