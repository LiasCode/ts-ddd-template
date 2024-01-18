import { Uuid } from "../../../shared/domain/Uuid";

export class UserId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
