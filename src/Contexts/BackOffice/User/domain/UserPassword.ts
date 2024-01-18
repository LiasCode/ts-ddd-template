import { comparePassword, hashPassword } from "../../../../apps/shared/passwordEncryption";
import { ValueObject } from "../../../shared/domain/ValueObject";

export class UserPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserPasswordIsValid(value);
  }
  private ensureUserPasswordIsValid(value: string): void {
    if (value.length < 3) {
      throw new Error(`The password <${value}> has less than 3 characters`);
    }
  }
  public async getHashedPassword(): Promise<string> {
    const hashedPassword = await hashPassword(this.value);
    return hashedPassword;
  }
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await comparePassword(password, hashedPassword);
  }
}
