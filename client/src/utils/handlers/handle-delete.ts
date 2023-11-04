import { UseMutateFunction } from "@tanstack/react-query";
import { DeleteTransactionResponse } from "@/interfaces/transaction";

export const handleDeleteTransaction = (
   e: React.MouseEvent<HTMLDivElement>,
   mutateFn: UseMutateFunction<DeleteTransactionResponse, any, string, unknown>,
   id: string
) => {
   e.stopPropagation();
   mutateFn(id);
};
