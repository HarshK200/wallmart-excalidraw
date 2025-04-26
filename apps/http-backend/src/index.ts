import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hi i'm the root route" });
});

app.listen(8080, () => {
  console.log("server running on port 3000");
});
