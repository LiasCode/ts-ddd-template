import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserId } from "../domain/UserId";
import { UserEmail } from "../domain/UserEmail";
import { ExecQuery } from "../../../../apps/shop/backend/services/postgresql";
import { UserPrimitves } from "../domain/UserPrimitives";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";

export class UserPostgresRepository implements UserRepository {
  static readonly TABLE_NAME = "users";

  constructor() {}

  async save(user: User): Promise<void> {
    try {
      // chekc if user exists
      const userExists = await this.findById(user.getId());
      if (!userExists) {
        const query = `INSERT INTO ${UserPostgresRepository.TABLE_NAME} (id, email, name ,password) VALUES ($1, $2, $3, $4)`;
        const values = [
          user.getId().value,
          user.getEmail().value,
          user.getName().value,
          user.getPassword().value,
        ];
        const res = await ExecQuery<UserPrimitves>(query, values);
        if (!res) {
          throw new Error("Error creating new user");
        }
        return;
      }
      // if user exists then update it
      const query = `UPDATE ${UserPostgresRepository.TABLE_NAME} SET email = $1, name = $2, password = $3 WHERE id = $4`;
      const values = [
        user.getEmail().value,
        user.getName().value,
        user.getPassword().value,
        user.getId().value,
      ];
      const res = await ExecQuery<UserPrimitves>(query, values);
      if (!res) {
        throw new Error("Error updating user");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error saving user");
    }
  }

  async findById(id: UserId): Promise<User | null> {
    try {
      const query = `SELECT * FROM ${UserPostgresRepository.TABLE_NAME} WHERE id = $1`;
      const values = [id.value];
      const result = await ExecQuery<UserPrimitves>(query, values);
      if (!result) {
        return null;
      }
      const user = result[0];
      if (!user) {
        return null;
      }

      return new User(
        new UserId(user.id),
        new UserName(user.name),
        new UserEmail(user.email),
        new UserPassword(user.password)
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user");
    }
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    try {
      const query = `SELECT * FROM ${UserPostgresRepository.TABLE_NAME} WHERE email = $1`;
      const values = [email.value];
      const result = await ExecQuery<UserPrimitves>(query, values);
      if (!result) {
        return null;
      }
      const user = result[0];
      if (!user) {
        return null;
      }

      return new User(
        new UserId(user.id),
        new UserName(user.name),
        new UserEmail(user.email),
        new UserPassword(user.password)
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user");
    }
  }

  async getAll(): Promise<User[] | null> {
    try {
      const query = `SELECT * FROM ${UserPostgresRepository.TABLE_NAME}`;
      const result = await ExecQuery<UserPrimitves>(query);
      if (!result) {
        return null;
      }
      const users = result.map(
        (user) =>
          new User(
            new UserId(user.id),
            new UserName(user.name),
            new UserEmail(user.email),
            new UserPassword(user.password)
          )
      );

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user");
    }
  }

  static async createTable(): Promise<void> {
    try {
      const query = `CREATE TABLE IF NOT EXISTS ${UserPostgresRepository.TABLE_NAME} (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;
      await ExecQuery(query);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating table");
    }
  }
}
