import { AdminRepository } from "../domain/AdminRepository";
import { Admin } from "../domain/Admin";
import { UseCase } from "../../../shared/application/UseCase";

export class AdminFinder extends UseCase {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async run(): Promise<Admin[] | null> {
    try {
      const admins = await this.adminRepository.getAll();

      if (!admins) {
        throw new Error("Can't Search Admins");
      }
      return admins;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
