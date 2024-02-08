import { AdminRepository } from "../domain/AdminRepository";
import { Admin } from "../domain/Admin";
import { UseCase } from "../../../shared/application/UseCase";
import { AdminName } from "../domain/AdminName";
import { AdminEmail } from "../domain/AdminEmail";
import { AdminPassword } from "../domain/AdminPassword";

export class AdminCreator extends UseCase {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async run(name: string, email: string, password: string): Promise<Admin | null> {
    try {
      const newAdmin = Admin.create(
        new AdminName(name),
        new AdminEmail(email),
        new AdminPassword(password)
      );
      await this.adminRepository.save(newAdmin);
      return newAdmin;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
