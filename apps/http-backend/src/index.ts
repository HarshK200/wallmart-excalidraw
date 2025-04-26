import express from "express";
import { connectDb, prisma } from "@repo/db";
import { v1Router } from "./routes";
import dotenv from "dotenv";

// loading environment variables
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/v1", v1Router);

connectDb();
app.listen(8080, () => {
  console.log("server running on port 8080");
});
