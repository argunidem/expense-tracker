import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import {
   validRegistrationInput,
   validLoginInput,
   successResponse,
   invalidLoginEmail,
   invalidLoginPassword,
   userNotFoundLogin,
   incorrectLoginPassword,
} from "../user.data";

describe("Login", () => {
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   describe("Login Controller", () => {
      describe("errors", () => {
         describe("zod error", () => {
            test("should return 400 and invalid email message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/login")
                  .set("content-type", "application/json")
                  .send(invalidLoginEmail);
               expect(statusCode).toBe(400);
               expect(body).toHaveProperty("status");
               expect(body.status).toEqual("fail");
               expect(body.message).toEqual("Not a valid email");
            });
            test("should return 400 and invalid password message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/login")
                  .set("content-type", "application/json")
                  .send(invalidLoginPassword);
               expect(statusCode).toBe(400);
               expect(body).toHaveProperty("status");
               expect(body.status).toEqual("fail");
               expect(body.message).toEqual("Password should be 6 characters minimum");
            });
         });
         describe("authentication errors", () => {
            test("should return 404 and not found message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/login")
                  .set("content-type", "application/json")
                  .send(userNotFoundLogin);
               expect(statusCode).toBe(404);
               expect(body.message).toEqual("User not found.");
            });
            test("should return 401 and invalid credentials message", async () => {
               await User.create(validRegistrationInput);

               const { statusCode, body } = await supertest(app)
                  .post("/api/users/login")
                  .set("content-type", "application/json")
                  .send(incorrectLoginPassword);
               expect(statusCode).toBe(401);
               expect(body.message).toEqual("Invalid credentials.");
            });
            afterEach(async () => {
               await User.deleteMany();
            });
         });
      });
      describe("success", () => {
         beforeEach(async () => {
            await User.create(validRegistrationInput);
         });
         test("should return 200 and the user data", async () => {
            const { statusCode, headers, body } = await supertest(app)
               .post("/api/users/login")
               .set("content-type", "application/json")
               .send(validLoginInput);
            expect(statusCode).toBe(200);
            expect(headers["set-cookie"]).toBeDefined();
            expect(body).toEqual(successResponse);
         });
      });
   });
});
