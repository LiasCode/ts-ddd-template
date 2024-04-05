import { comparePasswordSync, hashPasswordSync } from "../../../../apps/shared/passwordEncryption";
import { ValueObject } from "../../../shared/domain/ValueObject";

export class AdminPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureAdminPasswordIsValid(value);
  }
  private ensureAdminPasswordIsValid(value: string): void {
    if (value.length < 3) {
      throw new Error(`The password <${value}> has less than 3 characters`);
    }
  }
  static create(value: string): AdminPassword {
    const hashedPassword = hashPasswordSync(value);
    return new AdminPassword(hashedPassword);
  }
  static comparePassword(password: string, hashedPassword: string): boolean {
    return comparePasswordSync(password, hashedPassword);
  }
}
