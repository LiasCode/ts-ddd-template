import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserPrimitves } from "../domain/UserPrimitives";
import { UserId } from "../domain/UserId";
import { UserEmail } from "../domain/UserEmail";

const users: UserPrimitves[] = [];

export class UserInMemoryRepository implements UserRepository {
  constructor() {}

  async save(user: User): Promise<void> {
    console.log({ user: user.toPrimitives() });

    const userIndex = users.findIndex((u) => u.id === user.getId().value);
    if (userIndex === -1) {
      users.push(user.toPrimitives());
    } else {
      users[userIndex] = user.toPrimitives();
    }
  }

  async findById(id: UserId): Promise<User | null> {
    const user = users.find((u) => u.id === id.value);
    if (!user) return null;
    return User.fromPrimitives(user);
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const user = users.find((u) => u.email === email.value);
    if (!user) return null;
    return User.fromPrimitives(user);
  }

  async getAll(): Promise<User[] | null> {
    return users.map((u) => User.fromPrimitives(u));
  }
}
