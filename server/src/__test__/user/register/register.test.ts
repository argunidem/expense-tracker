import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import {
   invalidRegistrationEmail,
   invalidName,
   invalidRegistrationPassword,
   passwordMismatch,
   successResponse,
   validRegistrationInput,
} from "../user.data";

describe("Registration", () => {
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   describe("Register Controller", () => {
      describe("errors", () => {
         describe("zod error", () => {
            test("should return 400 and invalid name message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/register")
                  .set("content-type", "application/json")
                  .send(invalidName);

               expect(statusCode).toBe(400);
               expect(body).toHaveProperty("status");
               expect(body.status).toEqual("fail");
               expect(body.message).toEqual("Name should be 4 characters minimum");
            });

            test("should return 400 and invalid email message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/register")
                  .set("content-type", "application/json")
                  .send(invalidRegistrationEmail);

               expect(statusCode).toBe(400);
               expect(body).toHaveProperty("status");
               expect(body.status).toEqual("fail");
               expect(body.message).toEqual("Not a valid email");
            });

            test("should return 400 and invalid password message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/register")
                  .set("content-type", "application/json")
                  .send(invalidRegistrationPassword);

               expect(statusCode).toBe(400);
               expect(body).toHaveProperty("status");
               expect(body.status).toEqual("fail");
               expect(body.message).toEqual("Password should be 6 characters minimum");
            });

            test("should return 400 and password mismatch message", async () => {
               const { statusCode, body } = await supertest(app)
                  .post("/api/users/register")
                  .set("content-type", "application/json")
                  .send(passwordMismatch);

               expect(statusCode).toBe(400);
               expect(body).toHaveProperty("status");
               expect(body.status).toEqual("fail");
               expect(body.message).toEqual("Passwords do not match");
            });
         });

         describe("conflict error", () => {
            test("should return 409 and conflict message", async () => {
               await User.create(validRegistrationInput);

               const { statusCode, body } = await supertest(app)
                  .post("/api/users/register")
                  .set("content-type", "application/json")
                  .send(validRegistrationInput);

               expect(statusCode).toBe(409);
               expect(body.message).toEqual(
                  "Conflict: The email address is already in use by another user."
               );
            });
            afterEach(async () => {
               await User.deleteMany();
            });
         });
      });

      describe("success", () => {
         test("should return 201 and the user data", async () => {
            const { statusCode, headers, body } = await supertest(app)
               .post("/api/users/register")
               .set("content-type", "application/json")
               .send(validRegistrationInput);

            expect(statusCode).toBe(201);
            expect(headers["set-cookie"]).toBeDefined();
            expect(body).toEqual(successResponse);
         });
      });
   });
});