import { ValueObject } from "../../../shared/domain/ValueObject";

export class UserName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
