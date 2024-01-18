import { comparePasswordSync, hashPasswordSync } from "../../../../apps/shared/passwordEncryption";
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
  static create(value: string): UserPassword {
    const hashedPassword = hashPasswordSync(value);
    return new UserPassword(hashedPassword);
  }
  static comparePassword(password: string, hashedPassword: string): boolean {
    return comparePasswordSync(password, hashedPassword);
  }
}
