import { prisma, userSchema } from "@repo/db";
import express from "express";
import { hash } from "bcrypt";

export async function signupController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { username, email, password } = req.body;

    const userParsed = userSchema.safeParse({
      username,
      email,
      password,
    });
    if (!userParsed.success) {
      res.json({ msg: "Invalid fields", err: userParsed.error }).status(422);
      return;
    }

    // check if user exists in db
    const existingUser = await prisma.user.findUnique({
      where: { email: userParsed.data.email },
    });
    if (existingUser) {
      res.json({ err: "Email already registered" }).status(409);
      return;
    }

    const createdUser = await prisma.user.create({
      data: {
        username: userParsed.data.username,
        email: userParsed.data.email,
        passwordHash: userParsed.data.password,
      },
    });

    res
      .json({
        msg: "User signup successful",
        user: { id: createdUser.id, email: createdUser.email },
      })
      .status(201);
  } catch (e) {
    console.log(`Error occured in signupController\nErr:${e}`);
  }
}

export function loginController(req: express.Request, res: express.Response) {}
