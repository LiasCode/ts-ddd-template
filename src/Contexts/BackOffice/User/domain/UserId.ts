export class UserId {
  private value: string;

  constructor(value: string | null) {
    if (value === null) {
      this.value = Math.random().toString();
    } else {
      this.value = value;
    }
  }
  public getValue() {
    return this.value;
  }
}
