import Budget from "@/models/budget";

//! Create a new budget entry for the current month if it doesn't exist
const initializeBudget = async (userId: string) => {
   //- Get current month and year
   const { name, month } = getCurrentMonthAndYear();

   //- Check if a budget entry exists for the current month
   const existingBudget = await Budget.findOne({ month, user: userId });

   if (!existingBudget) {
      //- Create a new budget entry for the current month
      await Budget.create({
         name,
         month,
         user: userId,
      });
   }
};

//! Get current month and year
const getCurrentMonthAndYear = () => {
   //- Get current month and year
   const currentDate = new Date();
   const currentMonth = currentDate.toLocaleString("default", { month: "long" });
   const currentYear = currentDate.getFullYear();

   //- Create name and month variables
   const name = `${currentMonth}, ${currentYear}`;
   const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

   return { name, month };
};

export { initializeBudget };
