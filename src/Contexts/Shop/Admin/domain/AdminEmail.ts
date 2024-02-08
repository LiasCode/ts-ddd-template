import { ValueObject } from "../../../shared/domain/ValueObject";

export class AdminEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }
  private ensureIsValidEmail(value: string): void {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      throw new Error(`The email <${value}> is not valid`);
    }
  }
}
