import { AdminRepository } from "../domain/AdminRepository";
import { Admin } from "../domain/Admin";
import { UseCase } from "../../../shared/application/UseCase";
import { AdminEmail } from "../domain/AdminEmail";

export class AdminLogger extends UseCase {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async run(email: string, password: string): Promise<Admin | null> {
    try {
      const admin = await this.adminRepository.findByEmail(new AdminEmail(email));
      if (!admin) return null;
      const isValidAdmin = admin.comparePassword(password);
      if (!isValidAdmin) return null;
      return admin;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
