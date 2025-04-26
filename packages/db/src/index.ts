import { prisma } from "./client";

function connectDb() {
  try {
    prisma.$connect().then(() => {
      console.log("🟢 Successfully connected to the database");
    });
  } catch (e) {
    console.log("🔴 Error connecting to database\nErr: ");
  }
}

export { connectDb };
export { prisma } from "./client"; // exports instance of prisma
export * from "../generated/prisma"; // exports generated types from prisma
export * from "./zodSchemas";
