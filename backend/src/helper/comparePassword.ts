import bcrypt from "bcrypt";

export async function comparePassword(
  password: string,
  targetPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, targetPassword);
}
