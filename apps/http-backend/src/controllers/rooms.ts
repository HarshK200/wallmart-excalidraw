import { prisma } from "@repo/db";
import { createRoomSchema } from "@repo/backend-common";
import express from "express";

export async function createRoomController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const roomDataParsed = createRoomSchema.safeParse({
      ownerId: req.userId!, // asserting userId exists since this request comes after authMiddleware()
      name: req.body?.name,
    });
    if (!roomDataParsed.success) {
      res
        .status(422)
        .json({ msg: "Invalid fields", error: roomDataParsed.error });
      return;
    }

    // checking if room with same name already exists
    const existingRoom = await prisma.room.findFirst({
      where: { name: roomDataParsed.data.name, ownerId: req.userId },
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

export async function getRoomController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const roomName = req.params.roomName;
    if (!roomName) {
      res.status(422).json({ error: "Invalid room name" });
      return;
    }

    const room = await prisma.room.findFirst({
      where: {
        name: roomName,
        ownerId: req.userId,
      },
    });

    if (!room) {
      res.status(404).json({
        error:
          "Room not found, Current user doesn't have a room with provided name",
      });
      return;
    }

    res.status(200).json({ roomId: room.id });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
    console.log(`Error occured in getRoomController\n\n${e}`);
  }
}
