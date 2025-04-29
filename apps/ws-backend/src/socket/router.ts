import { RawData, WebSocket } from "ws";
import { ChatMessageController } from "../controllers/messageControllers";
import { parseRawMessage } from "../utils";

export async function handleMessage(
  socket: WebSocket,
  clients: Set<WebSocket>,
  data: RawData,
) {
  try {
    const message = await parseRawMessage(data);

    switch (message.type) {
      case "CHAT_MESSAGE":
        ChatMessageController(socket, clients, message);
        break;
      default:
        throw new Error("invalid message type");
        break;
    }
  } catch (e) {
    console.log("\n------- Error in handleMessage -------\n", e);
  }
}
