import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { ExecQuery, ExecQueryWithValues } from "../../../../apps/backOffice/backend/services/mysql";
import { UserPrimitves } from "../domain/UserPrimitives";
import { UserId } from "../domain/UserId";

export class UserMySqlRepository implements UserRepository {
  private userMysqlDbName = "user";
  constructor() {}

  async save(user: User): Promise<void> {
    ExecQueryWithValues<UserPrimitves>(
      `INSERT INTO ${this.userMysqlDbName} (id, name, email, password) VALUES (?, ?, ?, ?)`,
      [user.getId().value, user.getName().value, user.getEmail().value, user.getPassword().value]
    );
  }

  async findById(id: UserId): Promise<User | null> {
    try {
      const user = await ExecQuery<User>(
        `SELECT * FROM ${this.userMysqlDbName}} WHERE id = ${id.value}`
      );
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll(): Promise<User[] | null> {
    try {
      const users = await ExecQuery<User[]>(`SELECT * FROM ${this.userMysqlDbName}}`);
      return users;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
