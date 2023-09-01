import Income from "@/models/income";
import { IncomeInput } from "@/interfaces/income";

const newIncome = async (body: IncomeInput) => {
   const income = await Income.create(body);
   return income;
};

export { newIncome };
