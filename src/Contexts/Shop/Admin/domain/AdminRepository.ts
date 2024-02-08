import { Admin } from "./Admin";
import { AdminEmail } from "./AdminEmail";
import { AdminId } from "./AdminId";

export interface AdminRepository {
  save(Admin: Admin): Promise<void>;
  findById(id: AdminId): Promise<Admin | null>;
  getAll(): Promise<Admin[] | null>;
  findByEmail(email: AdminEmail): Promise<Admin | null>;
}
