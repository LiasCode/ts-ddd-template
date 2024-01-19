import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UseCase } from "../../../shared/application/UseCase";
import { UserId } from "../domain/UserId";

export class UserByIdFinder extends UseCase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async run(id: UserId): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new Error(`Can't find User with id <${id.value}>`);
      }
      return user;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
