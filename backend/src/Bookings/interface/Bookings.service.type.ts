import { UpdateQuery } from "mongoose";
import { Bookings, BookingsDocument } from "../Bookings.model";

export default interface BookingsServiceType {
  getBookings(): Promise<BookingsDocument[]>;
  getBooking(ID: string): Promise<BookingsDocument>;

  createBookings(data: Bookings): Promise<BookingsDocument>;
  updateBookings(
    id: string,
    data: UpdateQuery<Bookings>,
  ): Promise<BookingsDocument>;
  deleteBookings(id: string): Promise<BookingsDocument>;
}
