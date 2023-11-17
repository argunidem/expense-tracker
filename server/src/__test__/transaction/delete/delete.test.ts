import supertest from "supertest";
import app from "@/app";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import { IncomeData, invalidAmount, invalidIncomeData, invalidType } from "../transaction.data";
import User from "@/models/user";
import { validRegistrationInput } from "@/__test__/user/register/register.data";
import { validLoginInput } from "@/__test__/user/login/login.data";
import Category from "@/models/category";
import Transaction from "@/models/transaction";
import { TransactionDocument } from "@/interfaces/transaction";

//- Test route: DELETE /api/transactions/:id
describe("/api/transactions/:id", () => {
   //- Connect to a new in-memory database before running any tests.
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   let login: supertest.Response;
   let validCreateIncomeData: IncomeData = { ...invalidIncomeData };
   let transaction: TransactionDocument;
   beforeAll(async () => {
      await User.create(validRegistrationInput);
      login = await supertest(app).post("/api/users/login").send(validLoginInput);
      const category = await Category.create({
         name: "Salary",
         user: login.body.data._id,
      });
      validCreateIncomeData.category = category._id;

      transaction = await Transaction.create({
         ...validCreateIncomeData,
         user: login.body.data._id,
      });
   });

   //- Middleware tests
   describe("middlewares", () => {
      //- Route protection middleware
      describe("protect middleware", () => {
         test("should return 401 and unauthorized message", async () => {
            const { statusCode, body } = await supertest(app).delete(
               `/api/transactions/${transaction._id}`
            );

            expect(statusCode).toBe(401);
            expect(body.message).toEqual(
               "Unauthorized: You must be logged in to access this resource."
            );
         });
      });
   });

   //- Controller tests
   describe("controller", () => {
      //- Service tests
      describe("service", () => {
         test("should return 404 and not found message", async () => {
            const { statusCode, body } = await supertest(app)
               .delete("/api/transactions/654bac301e6322cdd4cab744")
               .set("Cookie", [login.headers["set-cookie"]]);
            expect(statusCode).toBe(404);
            expect(body.message).toEqual("Transaction not found.");
         });
         test("should return 200 and transaction deleted message", async () => {
            const { statusCode, body } = await supertest(app)
               .delete(`/api/transactions/${transaction._id}`)
               .set("Cookie", [login.headers["set-cookie"]]);

            expect(statusCode).toBe(200);
            expect(body).toEqual({
               status: "success",
               message: "Transaction deleted successfully",
            });
         });
      });
      afterAll(async () => {
         await User.deleteMany();
      });
   });
});
