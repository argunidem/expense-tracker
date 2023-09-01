import { Request } from "express";
import Income from "@/models/income";
import { ForbiddenError, NotFoundError } from "@/utils/error";
import { IncomeDocument, IncomeInput } from "@/interfaces/income";

const createNewIncome = async (body: IncomeInput) => {
   return await Income.create(body);
};

const getAndVerifyIncome = async (req: Request): Promise<IncomeDocument> => {
   try {
      //- Get income by id
      const income = await Income.findById(req.params.id);

      //- Check if income exists
      if (!income) {
         throw new NotFoundError("Income");
      }

      //- Check if user is owner of income
      if (income.user.toString() !== req.user?._id.toString()) {
         throw new ForbiddenError();
      }

      //- If query has populate, populate the income with the user
      if (req.query.populate) {
         await income.populate("user");
      }

      return income;
   } catch (error) {
      throw error;
   }
};

const updateIncomeById = async (req: Request): Promise<IncomeDocument> => {
   try {
      const {
         params: { id },
         body,
      } = req;

      //- Check if income exists and user is owner
      await getAndVerifyIncome(req);

      return (await Income.findOneAndUpdate({ _id: id }, body, {
         new: true,
         runValidators: true,
      })) as IncomeDocument;
   } catch (error) {
      throw error;
   }
};

const deleteIncomeById = async (req: Request) => {
   try {
      const {
         params: { id },
      } = req;

      //- Check if income exists and user is owner
      await getAndVerifyIncome(req);

      //- Delete income
      await Income.findOneAndDelete({ _id: id });
   } catch (error) {
      throw error;
   }
};

export { createNewIncome, getAndVerifyIncome, updateIncomeById, deleteIncomeById };
