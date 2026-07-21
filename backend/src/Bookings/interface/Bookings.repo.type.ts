import { UpdateQuery } from "mongoose";
import { Bookings, BookingsDocument } from "../Bookings.model";

export default interface BookingsRepoType {
  get(): Promise<BookingsDocument[]>;
  getByID(id: string): Promise<BookingsDocument>;
  create(data: Bookings): Promise<BookingsDocument>;
  update(id: string, data: UpdateQuery<Bookings>): Promise<BookingsDocument>;
  delete(id: string): Promise<BookingsDocument>;
}
