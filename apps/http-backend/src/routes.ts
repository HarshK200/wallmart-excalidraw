import express from "express";
import { loginController, signupController } from "./controllers/auth";
import { createRoomController, getRoomController } from "./controllers/rooms";
import { authMiddleware } from "./middlewares/auth";

const v1Router: express.Router = express.Router();

// auth routes
v1Router.post("/signup", signupController);
v1Router.post("/login", loginController);

// protected routes
v1Router.get("/room/:roomName", authMiddleware, getRoomController);
v1Router.post("/room", authMiddleware, createRoomController);

export { v1Router };
