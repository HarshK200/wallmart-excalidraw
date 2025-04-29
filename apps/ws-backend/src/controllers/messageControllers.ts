import { WebSocket } from "ws";
import { SocketMessage } from "../socket/types";
import { sendJsonMessage } from "../utils";

export function ChatMessageController(
  socket: WebSocket,
  clients: Set<WebSocket>,
  message: SocketMessage,
) {
  if (!message.data) {
    throw new Error("No message data");
  }
  console.log(`Recieved CHAT_MESSAGE: ${message.data}`);

  // Broadcast the message to all of the clients
  clients.forEach((client) => {
    sendJsonMessage(client, message);
  });
}
