import { ValueObject } from "../../../shared/domain/ValueObject";

export class UserEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
