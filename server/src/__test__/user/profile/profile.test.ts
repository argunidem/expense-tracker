import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import { successResponse, validLoginInput, validRegistrationInput } from "../user.data";

describe("Profile", () => {
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   describe("Profile Controller", () => {
      describe("errors", () => {
         describe("protect middleware", () => {
            test("should return 401 and unauthorized message", async () => {
               const { statusCode, body } = await supertest(app).get("/api/users/profile");
               expect(statusCode).toBe(401);
               expect(body.message).toEqual(
                  "Unauthorized: You must be logged in to access this resource."
               );
            });
         });
      });

      describe("success", () => {
         test("should return 200 and the user data", async () => {
            await User.create(validRegistrationInput);
            const login = await supertest(app).post("/api/users/login").send(validLoginInput);

            const { statusCode, body } = await supertest(app)
               .get("/api/users/profile")
               .set("Cookie", [login.headers["set-cookie"]]);

            expect(statusCode).toBe(200);
            expect(body).toEqual(successResponse);
         });
      });
   });
});
