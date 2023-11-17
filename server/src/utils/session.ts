import session from "express-session";
import MongoStore from "connect-mongo";
import { mongoUri, sessionSecret } from "@/config/variables";

export const sessionSetup = session({
   name: "sid",
   secret: sessionSecret,
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
   },
   store: MongoStore.create({
      mongoUrl: mongoUri,
   }),
});
