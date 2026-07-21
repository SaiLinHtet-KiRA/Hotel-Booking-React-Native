import { BookingDocument, Booking, BookingSchema } from "./Booking.model";
import BookingRepo from "./Booking.repo";
import BookingServiceType from "./interface/Booking.service.type";
import { validateZod } from "../../util/validate";
import BookingsService from "../Bookings.service";
import { PaginationQuery } from "./interface/Booking.query.type";
import { UpdateQuery } from "mongoose";

class BookingService implements BookingServiceType {
  async getBookings(
    query: PaginationQuery,
  ): Promise<{ data: BookingDocument[]; size: number }> {
    try {
      const data = await BookingRepo.get(query);
      const size = await this.getSize(query);

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(query: PaginationQuery): Promise<number> {
    try {
      return await BookingRepo.getCount(query);
    } catch (error) {
      throw error;
    }
  }
  async getBooking(id: string): Promise<BookingDocument> {
    try {
      return await BookingRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }
  async createBooking(data: Booking): Promise<BookingDocument> {
    try {
      const BookingData = validateZod(BookingSchema, data);

      const newBooking = await BookingRepo.create(BookingData);
      await BookingsService.updateBookings(newBooking.bookings, {
        $push: { bookings: newBooking._id },
        $inc: { size: 1 },
      });

      return newBooking;
    } catch (error) {
      throw error;
    }
  }
  async updateBooking(
    id: string,
    data: UpdateQuery<Booking>,
  ): Promise<BookingDocument> {
    try {
      const BookingData = validateZod(BookingSchema.partial(), data);

      return await BookingRepo.update(id, BookingData);
    } catch (error) {
      throw error;
    }
  }
  async deleteBooking(id: string): Promise<BookingDocument> {
    try {
      const deletedBooking = await BookingRepo.delete(id);

      await BookingsService.updateBookings(deletedBooking.bookings, {
        $pull: { bookings: deletedBooking._id },
        $inc: { size: -1 },
      });

      return deletedBooking;
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingService();
