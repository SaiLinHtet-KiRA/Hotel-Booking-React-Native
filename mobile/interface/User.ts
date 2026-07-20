export default interface User {
  _id: string;
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  bookings: string;
}

export type UserDTO = {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
};
