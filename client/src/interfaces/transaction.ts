export interface TransactionData {
   name?: string;
   description?: string;
   category?: string;
   source?: string;
   expense?: number;
   income?: number;
   date: string;
   regular: boolean;
   budgets: string[];
   expiresAt?: string;
   user: string;
   id: string;
}
