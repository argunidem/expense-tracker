import { columns } from "./columns";
import { data } from "./data";
import { DataTable } from "@/components/ui/tables/data-table";

const DashboardTable = () => {
   return (
      <div className='px-4 xl:mx-12 2xl:mx-40'>
         <DataTable
            columns={columns}
            data={data}
         />
      </div>
   );
};

export default DashboardTable;
