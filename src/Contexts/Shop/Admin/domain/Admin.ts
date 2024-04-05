import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { AdminEmail } from "./AdminEmail";
import { AdminId } from "./AdminId";
import { AdminName } from "./AdminName";
import { AdminPassword } from "./AdminPassword";
import { AdminPrimitves } from "./AdminPrimitives";

export class Admin extends AggregateRoot {
  private readonly id: AdminId;
  private name: AdminName;
  private email: AdminEmail;
  private password: AdminPassword;

  constructor(id: AdminId, name: AdminName, email: AdminEmail, password: AdminPassword) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create(name: AdminName, email: AdminEmail, password: AdminPassword): Admin {
    return new Admin(AdminId.random(), name, email, AdminPassword.create(password.value));
  }

  public toPrimitives(): AdminPrimitves {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }

  public toPrimitivesSafeData(): Omit<AdminPrimitves, "password"> {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
    };
  }

  public static fromPrimitives(plainData: AdminPrimitves): Admin {
    return new Admin(
      new AdminId(plainData.id),
      new AdminName(plainData.name),
      new AdminEmail(plainData.email),
      new AdminPassword(plainData.password)
    );
  }

  comparePassword(password: string): boolean {
    return AdminPassword.comparePassword(password, this.password.value);
  }

  public getId(): AdminId {
    return this.id;
  }

  // Getter y setter para el atributo 'name'
  public getName(): AdminName {
    return this.name;
  }

  // Getter y setter para el atributo 'email'
  public getEmail(): AdminEmail {
    return this.email;
  }

  // Getter y setter para el atributo 'password'
  public getPassword(): AdminPassword {
    return this.password;
  }
}
