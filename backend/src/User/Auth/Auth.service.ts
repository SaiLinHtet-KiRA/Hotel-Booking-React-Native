import { validateZod } from "../../util/validate";
import UserService from "../User.service";
import AuthServiceType from "./interface/Auth.Service.type";
import LoginType, { LoginSchema } from "./interface/Schema";
import { comparePassword } from "../../helper/comparePassword";
import { AuthorizeError } from "../../util/error/errors";

class AuthService implements AuthServiceType {
  async checkPasswordIsCorrect(data: LoginType): Promise<string> {
    try {
      const { email, password } = validateZod(LoginSchema, data);

      const existingUser = await UserService.getUsers({ email: email });

      if (!existingUser.data.length) {
        throw new AuthorizeError("Invalid email or password");
      }

      const isMatch = await comparePassword(
        password,
        existingUser.data[0].password!,
      );

      if (!isMatch) {
        throw new AuthorizeError("Invalid email or password");
      }

      return existingUser.data[0]._id.toString();
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
