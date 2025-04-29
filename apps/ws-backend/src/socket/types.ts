export interface SocketMessage {
  type: "CHAT_MESSAGE" | "ERROR_MESSAGE" | null;
  message: string;
  reason?: string;
}
