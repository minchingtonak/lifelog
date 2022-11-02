import mongoose, { ConnectionStates } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export default async function initDb() {
  switch (mongoose.connection.readyState) {
    case ConnectionStates.disconnected:
    case ConnectionStates.disconnecting:
    case ConnectionStates.uninitialized:
      await mongoose.connect(MONGODB_URI as string);
      console.log("connected");
  }
}
