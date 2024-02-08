import { ValueObject } from "../../../shared/domain/ValueObject";

export class AdminName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureUserNameIsValid(value);
  }
  private ensureUserNameIsValid(value: string): void {
    if (value.length < 3) {
      throw new Error(`The name <${value}> has less than 3 characters`);
    }
  }
}
