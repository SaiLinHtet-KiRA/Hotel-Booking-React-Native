import { connectDB } from "./config/DB/mongoose";
import { createDefaultAdmin } from "./helper/createDefaultAdmin";
import { express } from "./server/index";

async function start() {
  await connectDB();
  await createDefaultAdmin();
  express.startServer();
}

start();
