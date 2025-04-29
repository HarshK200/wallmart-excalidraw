import http from "node:http";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { JWT_SECRET } from "./envVariables";
import { AuthJwtPayload } from "@repo/backend-common/src/types";

export function authenticateUser(request: http.IncomingMessage): boolean {
  try {
    if (!request.headers.cookie) {
      return false;
    }

    const cookies = request.headers.cookie
      .split(";")
      .reduce<Record<string, string>>((acc, current) => {
        const [name, value] = current.trim().split("=");
        if (name && value) {
          acc[name.trim()] = value.trim();
        }
        return acc;
      }, {});

    const authToken = cookies["auth"];
    if (!authToken) {
      return false;
    }

    // TODO: remove these debug console.log() no need everything works.... for now

    console.log(`\n\nThe auth token from the cookie is: ${authToken}`);

    console.log("\n\nverifying token");
    const decodedToken = verify(authToken, JWT_SECRET) as AuthJwtPayload;
    console.log(
      `\n\nVerified & Decoded Token: ${JSON.stringify(decodedToken)}`,
    );

    return true;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      console.log(`JWT token expired`);
      return false;
    }
    console.log(`Error in authenticateUser returning false => \n${e}`);
    return false;
  }
}
