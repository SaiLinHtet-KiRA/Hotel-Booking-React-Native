import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } from "../config/config";
import UserService from "../User/User.service";

export async function createDefaultAdmin() {
  try {
    const existingDefaultAdmin = await UserService.getUsers({
      role: "admin",
    });

    if (existingDefaultAdmin.data.length) {
      return;
    }
    await UserService.createUser({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
