import { UpdateQuery } from "mongoose";
import { Booking, BookingDocument } from "../Booking.model";
import { PaginationQuery } from "./Booking.query.type";

export default interface BookingServiceType {
  getBookings(
    query: PaginationQuery,
  ): Promise<{ data: BookingDocument[]; size: number }>;
  getSize(query: PaginationQuery): Promise<number>;
  getBooking(ID: string): Promise<BookingDocument>;
  createBooking(data: Booking): Promise<BookingDocument>;
  updateBooking(
    id: string,
    data: UpdateQuery<Booking>,
  ): Promise<BookingDocument>;
  deleteBooking(id: string): Promise<BookingDocument>;
}
