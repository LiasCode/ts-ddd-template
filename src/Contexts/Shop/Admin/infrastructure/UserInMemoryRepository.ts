import { User } from "../domain/User";
import { UserRepository } from "../domain/AdminRepository";
import { UserPrimitves } from "../domain/AdminPrimitives";
import { UserId } from "../domain/AdminId";
import { AdminEmail } from "../domain/AdminEmail";

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

  async findByEmail(email: AdminEmail): Promise<User | null> {
    const user = users.find((u) => u.email === email.value);
    if (!user) return null;
    return User.fromPrimitives(user);
  }

  async getAll(): Promise<User[] | null> {
    return users.map((u) => User.fromPrimitives(u));
  }
}
