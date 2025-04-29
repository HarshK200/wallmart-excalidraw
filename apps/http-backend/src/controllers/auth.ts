import { prisma } from "@repo/db";
import { userLoginSchema, userSignupSchema } from "@repo/backend-common";
import express from "express";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envVariables";

export async function signupController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const userSignupParsed = userSignupSchema.safeParse({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (!userSignupParsed.success) {
      res
        .status(422)
        .json({ msg: "Invalid fields", error: userSignupParsed.error });
      return;
    }

    // check if user exists in db
    const existingUser = await prisma.user.findUnique({
      where: { email: userSignupParsed.data.email },
    });
    if (existingUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const createdUser = await prisma.user.create({
      data: {
        username: userSignupParsed.data.username,
        email: userSignupParsed.data.email,
        passwordHash: await hash(userSignupParsed.data.password, 10),
      },
    });

    res.status(201).json({
      msg: "User signup successful",
      user: { id: createdUser.id, email: createdUser.email },
    });
  } catch (e) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(`Error occured in signupController\n${e}`);
  }
}

export async function loginController(
  req: express.Request,
  res: express.Response,
) {
  try {
    const userLoginParsed = userLoginSchema.safeParse({
      email: req.body.email,
      password: req.body.password,
    });
    if (!userLoginParsed.success) {
      res
        .status(422)
        .json({ msg: "Invalid fields", error: userLoginParsed.error });
      return;
    }

    // check if user exists in db
    const dbUser = await prisma.user.findUnique({
      where: { email: userLoginParsed.data.email },
    });
    if (!dbUser) {
      res.status(404).json({ error: "User with email not found" });
      return;
    }

    const isPasswordValid = await compare(
      userLoginParsed.data.password,
      dbUser.passwordHash,
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    // NOTE: ttl is time-to-live i.e. expiry time
    const jwtToken = sign(
      { userId: dbUser.id },
      JWT_SECRET,
      { expiresIn: "7h" }, // cookie token lasts for 7hr
    );

    res
      .status(200)
      .cookie("auth", jwtToken, {
        httpOnly: true, // means cookie is not accessable by javascript on client side
        secure: process.env.ENVIRONMENT === "production", // use cookie with HTTPS only requests
        sameSite: "lax", // to prevent CSRF attacks
      })
      .json({ msg: "Login successful" });
    return;
  } catch (e) {
    res.status(500).json({ msg: "Internal server error" });
    console.log(`Error occured in loginController\n${e}`);
  }
}
