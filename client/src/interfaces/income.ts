export interface Income {
   name?: string;
   description?: string;
   source: string;
   amount: number;
   date: string;
   regular: boolean;
   budgets: string[];
   expiresAt?: string;
   user: string;
   _id: string;
}

export interface MappedIncomeData extends Omit<Income, "amount" | "_id"> {
   income: number;
   id: string;
}
