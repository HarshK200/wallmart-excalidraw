import { WebSocketServer } from "ws";

export function setupConnectionManager(wss: WebSocketServer) {
  wss.on("connection", (ws: WebSocket, request) => {
    console.log("client connected");
  });
}
