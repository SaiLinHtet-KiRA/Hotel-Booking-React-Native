import type Room from "./Room";

export interface UserDTO {
  name: string;
  password: string;
  role: "admin" | "owner" | "user";
}
export default interface User extends UserDTO {
  _id: string;
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  records: Room[];
}
