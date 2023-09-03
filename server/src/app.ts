import "module-alias/register";
import express, { Application } from "express";
import "dotenv/config";
import "colors";
import "@/config/env.server";
import { notFound, errorHandler } from "@/middlewares";
import { sessionSetup } from "@/utils/session";
import router from "@/routes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app: Application = express();

//. Middleware setup
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(sessionSetup);

//. Routes startpoint
app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
