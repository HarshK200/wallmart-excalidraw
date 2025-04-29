export interface SocketMessage {
  type: "CHAT_MESSAGE" | null;
  data: string;
}
