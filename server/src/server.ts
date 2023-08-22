import express, { Application } from "express";
import "dotenv/config";
import { port } from "./config/variables";
import "colors";
import "./config/env.server";

const app: Application = express();

app.listen(port, () => console.log(`Server running on port ${port}`.green.underline));
