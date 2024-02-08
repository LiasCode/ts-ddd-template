import { AdminRepository } from "../domain/AdminRepository";
import { Admin } from "../domain/Admin";
import { UseCase } from "../../../shared/application/UseCase";
import { AdminId } from "../domain/AdminId";

export class AdminByIdFinder extends UseCase {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async run(id: AdminId): Promise<Admin | null> {
    try {
      const admin = await this.adminRepository.findById(id);

      if (!admin) {
        throw new Error(`Can't find Admin with id <${id.value}>`);
      }
      return admin;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
}
