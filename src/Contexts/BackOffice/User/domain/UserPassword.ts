import { ValueObject } from "../../../shared/domain/ValueObject";

export class UserPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
