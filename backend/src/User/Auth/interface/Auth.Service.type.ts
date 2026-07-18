import LoginType from "./Schema";

export default interface AuthServiceType {
  checkPasswordIsCorrect(data: LoginType): Promise<string>;
}
