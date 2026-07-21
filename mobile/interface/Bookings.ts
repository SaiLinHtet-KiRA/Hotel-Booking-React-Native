import Booking from "./Booking";

export default interface Bookings {
  _id: string;
  size: number;
  bookings: Booking[];
}
