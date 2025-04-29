import { WebSocketServer } from "ws";
import { setupConnectionManager } from "./socket/connection";

const PORT = 8081;
const wss = new WebSocketServer({ port: PORT });

setupConnectionManager(wss);

console.log(`Websocket server started on PORT ${PORT}`);
