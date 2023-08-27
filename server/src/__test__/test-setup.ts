import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const setupTestEnvironment = async () => {
   const mongoServer = await MongoMemoryServer.create();
   await mongoose.connect(mongoServer.getUri());
};

export const teardownTestEnvironment = async () => {
   await mongoose.disconnect();
   await mongoose.connection.close();
};
