import express from "express";
import { connectDb } from "@repo/db";
import { v1Router } from "./routes";
import cookieParser from "cookie-parser";

const PORT = 8080;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/v1", v1Router);

async function main() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (e) {
    console.error(`Error occured in main in index.ts\n${e}`);
  }
}

main();
