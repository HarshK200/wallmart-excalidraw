import dotenv from "dotenv";

process.env.environment === "production" ? null : dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}
export const JWT_SECRET = process.env.JWT_SECRET;
