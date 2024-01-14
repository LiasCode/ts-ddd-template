import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  getAll(): Promise<User[] | null>;
}
