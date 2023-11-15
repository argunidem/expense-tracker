import TableContainer from "@/components/ui/table/table-container";
import { columns as budgetColumns } from "@/components/sections/private/budget/budget-columns";
import { columns as transactionColumns } from "@/components/sections/private/transaction/transaction-columns";
import { MappedBudgetData } from "@/interfaces/budget";
import { Transaction } from "@/interfaces/transaction";

interface HomeTablesProps {
   data: {
      budgets: MappedBudgetData[] | undefined;
      transactions:
         | {
              incomes: Transaction[];
              expenses: Transaction[];
           }
         | undefined;
   };
}

const HomeTables = ({ data: { budgets, transactions } }: HomeTablesProps) => {
   return (
      <>
         <TableContainer
            data={budgets || []}
            columns={budgetColumns}
         />
         <TableContainer
            data={transactions?.incomes || []}
            columns={transactionColumns}
         />
         <TableContainer
            data={transactions?.expenses || []}
            columns={transactionColumns}
         />
      </>
   );
};

export default HomeTables;
