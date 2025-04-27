import express from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envVariables";

interface Jwt_Payload {
  userId: string;
}

export function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const token = req.cookies?.auth;
    if (!token) {
      res.status(401).json({ err: "Invalid auth token" });
      return;
    }

    try {
      const decodedToken = verify(token, JWT_SECRET) as Jwt_Payload;
      req.body.userId = decodedToken.userId;

      next();
    } catch (e) {
      res.status(401).json({ err: e });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "Internal server error" });
  }
}
