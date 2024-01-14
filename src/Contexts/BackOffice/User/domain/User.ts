import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";
import { UserPrimitves } from "./UserPrimitives";

export class User {
  private id: UserId;
  private name: UserName;
  private email: UserEmail;
  private password: UserPassword;

  constructor(id: UserId, name: UserName, email: UserEmail, password: UserPassword) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create(name: UserName, email: UserEmail, password: UserPassword): User {
    return new User(new UserId(null), name, email, password);
  }

  public toPrimitives(): UserPrimitves {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
    };
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
