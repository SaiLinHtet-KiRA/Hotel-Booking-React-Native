import { MONGODB_URL } from "../config";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
