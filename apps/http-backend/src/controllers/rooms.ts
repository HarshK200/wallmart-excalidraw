import express from "express";

export function createRoomController(
  req: express.Request,
  res: express.Response,
) {
  const userId = req.userId!;
  res.json({ msg: "hi this is create room route" });
}
