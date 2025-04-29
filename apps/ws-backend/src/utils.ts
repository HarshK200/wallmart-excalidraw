import { RawData, WebSocket } from "ws";
import { SocketMessage } from "./socket/types";

export function isObject(variable: any) {
  return (
    typeof variable === "object" &&
    variable !== null &&
    variable.constructor === Object
  );
}

// Throws an error if the json string is invalid
export async function parseRawMessage(data: RawData) {
  try {
    // TODO: handle non json requests
    const message = await JSON.parse(data.toString());

    if (!isObject(message)) {
      throw new Error();
    }

    return message as SocketMessage;
  } catch (e) {
    throw new Error("recieved invalid raw message. Cannot parse to JSON");
  }
}

export function sendJsonMessage(socket: WebSocket, message: SocketMessage) {
  try {
    const jsonStr = JSON.stringify(message);
    socket.send(jsonStr);
  } catch (e) {
    throw new Error(
      `Unable to send JSON Message. Call to JSON.stringify() failed with error\n${e}`,
    );
  }
}
