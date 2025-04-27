import { createRoomSchema, prisma } from "@repo/db";
import express from "express";

export async function createRoomController(
  req: express.Request,
  res: express.Response,
) {
  const roomDataParsed = createRoomSchema.safeParse({
    ownerId: req.userId,
    slug: req.body?.slug,
  });
  if (!roomDataParsed.success) {
    res
      .status(422)
      .json({ msg: "Invalid fields", error: roomDataParsed.error });
    return;
  }

  // checking if room already exists
  const existingRoom = await prisma.room.findUnique({
    where: { slug: roomDataParsed.data.slug },
  });
  if (existingRoom) {
    res.status(411).json({ error: "Room with same slug already exists" });
    return;
  }

  // create new room
  const room = await prisma.room.create({ data: roomDataParsed.data });

  res.status(201).json({ msg: "room created successfully", roomId: room.id });
}
