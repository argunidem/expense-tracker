import { create } from "zustand";
import { MappedBudgetData } from "@/interfaces/budget";
import { Transaction } from "@/interfaces/transaction";

interface Details {
   data: { key: string; value: MappedBudgetData | Transaction } | null;
   setData: (data: MappedBudgetData | Transaction, type: "budget" | "transaction") => void;
}

const useDetails = create<Details>((set) => ({
   data: null,
   setData: (data, type) => set({ data: { key: type, value: data } }),
}));

export default useDetails;
