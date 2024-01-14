import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UseCase } from "../../../shared/application/UseCase";
import { UserName } from "../domain/UserName";
import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";

export class UserCreator extends UseCase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async run(name: string, email: string, password: string): Promise<User | null> {
    try {
      const newUser = User.create(
        new UserName(name),
        new UserEmail(email),
        new UserPassword(password)
      );
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
