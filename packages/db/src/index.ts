import { prisma } from "./client";

async function connectDb() {
  try {
    await prisma.$connect();
    console.log("🟢 Successfully connected to the database");
  } catch (e) {
    throw new Error(`🔴 Error connecting to database\n ${e}`);
  }
}

export { connectDb };
export { prisma } from "./client"; // exports instance of prisma
export * from "../generated/prisma"; // exports generated types from prisma
