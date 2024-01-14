import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UseCase } from "../../../shared/application/UseCase";

export class UserFinder extends UseCase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async run(): Promise<User[] | null> {
    try {
      const users = await this.userRepository.getAll();

      if (!users) {
        throw new Error("Can't Search Users");
      }
      return users;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
