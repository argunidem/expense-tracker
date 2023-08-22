import express, { Application } from "express";
import "dotenv/config";
import "colors";
import "./config/env.server";
import { notFound, errorHandler } from "./middlewares";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
   try {
      throw new Error("Something went wrong");
   } catch (error) {
      return next(error);
   }
});

app.use(notFound);
app.use(errorHandler);

export default app;
