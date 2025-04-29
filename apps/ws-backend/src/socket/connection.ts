import { WebSocketServer, WebSocket } from "ws";
import { handleMessage } from "./router";
import { authenticateUser } from "../utils/auth";

export function setupConnectionManager(wss: WebSocketServer) {
  wss.on("connection", (ws: WebSocket, request) => {
    const isAuthenticated = authenticateUser(request);
    if (!isAuthenticated) {
      ws.close();
      return;
    }

    console.log("client connected");

    ws.on("error", console.error);

    ws.on("message", (data) => {
      handleMessage(ws, wss.clients, data);
    });
  });
}
