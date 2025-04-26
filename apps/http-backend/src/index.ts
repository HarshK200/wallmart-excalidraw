import { prisma } from "@repo/db";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hi i'm the root route" });
});

app.get("/db-health", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ msg: "Successfully connected to the db 🟢" }).status(200);
  } catch (e) {
    res.json({ err: "Couldn't connect to db 🔴" }).status(500);
    console.log("Err:", e);
  }
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
