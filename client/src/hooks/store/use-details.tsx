import { create } from "zustand";
import { MappedBudgetData } from "@/interfaces/budget";
import { MappedExpenseData } from "@/interfaces/expense";
import { MappedIncomeData } from "@/interfaces/income";
import { TransactionData } from "@/interfaces/transaction";

interface Details {
   data: { key: string; value: MappedBudgetData | TransactionData } | null;
   setData: (
      data: MappedBudgetData | MappedExpenseData | MappedIncomeData,
      type: "budget" | "transaction"
   ) => void;
}

const useDetails = create<Details>((set) => ({
   data: null,
   setData: (data, type) => set({ data: { key: type, value: data } }),
}));

export default useDetails;
