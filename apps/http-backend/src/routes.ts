import express from "express";
import { loginController, signupController } from "./controllers/auth";
import { createRoomController } from "./controllers/rooms";

const v1Router: express.Router = express.Router();

// auth routes
v1Router.get("/signup", signupController);
v1Router.get("/login", loginController);

v1Router.get("/create-room", createRoomController);

export { v1Router };
