import express from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envVariables";
import { AuthJwtPayload } from "@repo/backend-common";

export function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const token = req.cookies?.auth;
    if (!token) {
      res.status(401).json({ error: "Auth token not provided" });
      return;
    }

    try {
      const decodedToken = verify(token, JWT_SECRET) as AuthJwtPayload;
      req.userId = decodedToken.userId;
      next();
    } catch (e) {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
