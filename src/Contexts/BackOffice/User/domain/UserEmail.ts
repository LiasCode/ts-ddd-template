
export class UserEmail {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}