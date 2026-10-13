import mongoose from "mongoose";
import env from "./env.js";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(env.mongoUri);
    isConnected = true;
    console.log(`[db] MongoDB connected -> ${mongoose.connection.name}`);
    return mongoose.connection;
  } catch (error) {
    console.error("[db] MongoDB connection failed:", error.message);
    // Fail fast: an API that thinks it's healthy without a DB
    // connection causes confusing bugs later. Exit instead.
    process.exit(1);
  }
}

export function getConnectionState() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState;
}
