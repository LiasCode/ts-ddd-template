import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UseCase } from "../../../shared/application/UseCase";
import { UserEmail } from "../domain/UserEmail";

export class UserLogger extends UseCase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async run(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findByEmail(new UserEmail(email));
      if (!user) return null;
      const isValidUser = user.comparePassword(password);
      if (!isValidUser) return null;
      return user;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
