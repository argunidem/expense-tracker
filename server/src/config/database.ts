import mongoose from "mongoose";
import { mongoUri } from "./variables";

async function connect() {
   try {
      const dbInstance = await mongoose.connect(mongoUri);
      console.log(`Connected to MongoDB: ${dbInstance.connection.host}`.green);
   } catch (error) {
      console.error("Could not connect to MongoDB");
      process.exit(1);
   }
}

export default connect;
