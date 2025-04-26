import express from "express";
import { loginController, signupController } from "./controllers/auth";
import { createRoomController } from "./controllers/rooms";

const v1Router: express.Router = express.Router();

// auth routes
v1Router.post("/signup", signupController);
v1Router.post("/login", loginController);

v1Router.post("/create-room", createRoomController);

export { v1Router };
