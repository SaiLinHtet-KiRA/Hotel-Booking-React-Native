export interface UserBookings {
  _id: string;
  size: number;
  bookings: string[];
}

export default interface User {
  _id: string;
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  bookings: string | UserBookings;
}

export type UserDTO = {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
};
