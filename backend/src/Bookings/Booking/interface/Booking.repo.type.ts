import { UpdateQuery } from "mongoose";
import { Booking, BookingDocument } from "../Booking.model";
import { PaginationQuery } from "./Booking.query.type";

export default interface BookingRepoType {
  get(query: PaginationQuery): Promise<BookingDocument[]>;
  getCount(query: PaginationQuery): Promise<number>;
  getByID(id: string): Promise<BookingDocument>;
  create(data: Booking): Promise<BookingDocument>;
  update(id: string, data: UpdateQuery<Booking>): Promise<BookingDocument>;
  delete(id: string): Promise<BookingDocument>;
}
