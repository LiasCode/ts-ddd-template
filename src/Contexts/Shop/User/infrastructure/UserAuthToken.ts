import jwt from "jsonwebtoken";
import { User } from "../domain/User";
import { z } from "zod";

export const UserAuthTokenPayloadSchema = z.object({
  userId: z.string(),
});

export type UserAuthTokenPayload = z.infer<typeof UserAuthTokenPayloadSchema>;

export class UserAuthToken {
  private static cookieName: string = "auth-user-token";
  private static secret: string = "secret";

  static getCookieName(): string {
    return this.cookieName;
  }

  static async createJWT(user: User): Promise<string | null> {
    try {
      const token = jwt.sign({ userId: user.getId().value }, this.secret);
      if (!token) return null;
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async validateJWT(token: string): Promise<UserAuthTokenPayload | null> {
    try {
      const decodedToken = jwt.verify(token, this.secret);
      if (!decodedToken) return null;
      const decodedTokenParsed = UserAuthTokenPayloadSchema.parse(decodedToken);
      return decodedTokenParsed;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
