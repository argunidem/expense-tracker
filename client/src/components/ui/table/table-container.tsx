import { DataTable } from "@/components/ui/table/data-table";
import { Transaction } from "@/interfaces/transaction";

interface TableContainerProps {
   data: Transaction[];
   columns: any;
   searchBy: string;
}

const TableContainer = ({ data, columns, searchBy }: TableContainerProps) => {
   return (
      <div className='mt-8 px-4 xl:mx-12 2xl:mx-40'>
         <DataTable<Transaction, any>
            columns={columns}
            data={data}
            searchBy={searchBy}
         />
      </div>
   );
};

export default TableContainer;
