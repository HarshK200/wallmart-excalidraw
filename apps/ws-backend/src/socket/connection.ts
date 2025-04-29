import { WebSocketServer, WebSocket } from "ws";
import { handleMessage } from "./router";

export function setupConnectionManager(wss: WebSocketServer) {
  wss.on("connection", (ws: WebSocket, request) => {
    console.log("client connected");

    ws.on("error", console.error);

    ws.on("message", (data) => {
      handleMessage(ws, wss.clients, data);
    });
  });
}
