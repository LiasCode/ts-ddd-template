import bcrypt from "bcrypt";

// Hashes a password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Compares a password with a hashed string
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function hashPasswordSync(password: string): string {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

// Compares a password with a hashed string
export function comparePasswordSync(password: string, hashedPassword: string): boolean {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  return isMatch;
}
