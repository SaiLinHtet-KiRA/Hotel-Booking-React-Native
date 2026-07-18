import { validateZod } from "../../util/validate";
import UserService from "../User.service";
import AuthServiceType from "./interface/Auth.Service.type";
import LoginType, { LoginSchema } from "./interface/Schema";
import { comparePassword } from "../../helper/comparePassword";
import { AuthorizeError } from "../../util/error/errors";

class AuthService implements AuthServiceType {
  async checkPasswordIsCorrect(data: LoginType): Promise<string> {
    try {
      const { name, password } = validateZod(LoginSchema, data);

      const existingUser = await UserService.getUsers({ name });

      if (!existingUser.length) {
        throw new AuthorizeError("Invalid name or password");
      }

      const isMatch = await comparePassword(
        password,
        existingUser[0].password!,
      );

      if (!isMatch) {
        throw new AuthorizeError("Invalid name or password");
      }

      return existingUser[0]._id.toString();
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
