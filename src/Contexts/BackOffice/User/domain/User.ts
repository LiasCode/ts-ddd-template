import { Entity } from "../../../shared/domain/Entity";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";
import { UserPrimitves } from "./UserPrimitives";

export class User extends Entity {
  private readonly id: UserId;
  private name: UserName;
  private email: UserEmail;
  private password: UserPassword;

  constructor(id: UserId, name: UserName, email: UserEmail, password: UserPassword) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create(name: UserName, email: UserEmail, password: UserPassword): User {
    return new User(UserId.random(), name, email, UserPassword.create(password.value));
  }

  public toPrimitives(): UserPrimitves {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }

  public toPrimitivesSafeData(): Omit<UserPrimitves, "password"> {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
    };
  }

  public static fromPrimitives(plainData: UserPrimitves): User {
    return new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password)
    );
  }

  public getId(): UserId {
    return this.id;
  }

  // Getter y setter para el atributo 'name'
  public getName(): UserName {
    return this.name;
  }

  public setName(name: UserName): void {
    this.name = name;
  }

  // Getter y setter para el atributo 'email'
  public getEmail(): UserEmail {
    return this.email;
  }

  public setEmail(email: UserEmail): void {
    this.email = email;
  }

  // Getter y setter para el atributo 'password'
  public getPassword(): UserPassword {
    return this.password;
  }

  public setPassword(password: UserPassword): void {
    this.password = password;
  }
}
