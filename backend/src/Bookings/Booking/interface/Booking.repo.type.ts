import { Booking, BookingDocument } from "../Booking.model";

export default interface BookingRepoType {
  get(): Promise<BookingDocument[]>;
  getByID(id: string): Promise<BookingDocument>;
  create(data: Booking): Promise<BookingDocument>;
  update(id: string, data: Booking): Promise<BookingDocument>;
  delete(id: string): Promise<BookingDocument>;
}
