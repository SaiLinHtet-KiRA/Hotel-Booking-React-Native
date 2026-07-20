import { ADMIN_NAME, ADMIN_PASSWORD } from "../config/config";
import UserService from "../User/User.service";

export async function createDefaultAdmin() {
  try {
    const existingDefaultAdmin = await UserService.getUsers({
      name: ADMIN_NAME,
    });

    if (existingDefaultAdmin.length) {
      return;
    }
    await UserService.createUser({
      name: ADMIN_NAME,
      email: ADMIN_NAME,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
