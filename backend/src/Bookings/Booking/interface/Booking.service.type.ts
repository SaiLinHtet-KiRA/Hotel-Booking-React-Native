import { Booking, BookingDocument } from "../Booking.model";

export default interface BookingServiceType {
  getBookings(): Promise<BookingDocument[]>;
  getBooking(ID: string): Promise<BookingDocument>;
  createBooking(data: Booking): Promise<BookingDocument>;
  updateBooking(id: string, data: Booking): Promise<BookingDocument>;
  deleteBooking(id: string): Promise<BookingDocument>;
}
