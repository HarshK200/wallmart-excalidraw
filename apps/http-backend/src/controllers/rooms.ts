import { prisma } from "@repo/db";
import { createRoomSchema } from "@repo/backend-common";
import express from "express";

export async function createRoomController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const roomDataParsed = createRoomSchema.safeParse({
      ownerId: req.userId,
      name: req.body?.name,
    });
    if (!roomDataParsed.success) {
      res
        .status(422)
        .json({ msg: "Invalid fields", error: roomDataParsed.error });
      return;
    }

    // checking if room already exists
    const existingRoom = await prisma.room.findUnique({
      where: { name: roomDataParsed.data.name },
    });
    if (existingRoom) {
      res.status(411).json({ error: "Room with same name already exists" });
      return;
    }

    // create new room
    const room = await prisma.room.create({ data: roomDataParsed.data });

    res.status(201).json({ msg: "room created successfully", roomId: room.id });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
    console.log(`Error occured in createRoomController\n\n${e}`);
  }
}
