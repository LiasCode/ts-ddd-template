export abstract class UseCase {
  constructor() {}

  abstract run(...args: any[]): Promise<any>;
}
