import { MappedExpenseData } from "@/interfaces/expense";
import { DataTable } from "@/components/ui/tables/data-table";
import { MappedIncomeData } from "@/interfaces/income";

interface TableContainerProps {
   data: MappedIncomeData[] | MappedExpenseData[];
   columns: any;
   searchBy: string;
}

const TableContainer = ({ data, columns, searchBy }: TableContainerProps) => {
   return (
      <div className='mt-8 px-4 xl:mx-12 2xl:mx-40'>
         <DataTable<MappedIncomeData | MappedExpenseData, any>
            columns={columns}
            data={data}
            searchBy={searchBy}
         />
      </div>
   );
};

export default TableContainer;
