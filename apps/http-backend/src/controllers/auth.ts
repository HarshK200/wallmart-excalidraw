import { prisma, userSchema } from "@repo/db";
import express from "express";
import { hash } from "bcrypt";

export async function signupController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const userParsed = userSchema.safeParse({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (!userParsed.success) {
      res.status(422).json({ msg: "Invalid fields", err: userParsed.error });
      return;
    }

    // check if user exists in db
    const existingUser = await prisma.user.findUnique({
      where: { email: userParsed.data.email },
    });
    if (existingUser) {
      res.status(409).json({ err: "Email already registered" });
      return;
    }

    const createdUser = await prisma.user.create({
      data: {
        username: userParsed.data.username,
        email: userParsed.data.email,
        passwordHash: await hash(userParsed.data.password, 10),
      },
    });

    res.status(201).json({
      msg: "User signup successful",
      user: { id: createdUser.id, email: createdUser.email },
    });
  } catch (e) {
    console.log(`Error occured in signupController\n${e}`);
  }
}

export function loginController(req: express.Request, res: express.Response) {
}
