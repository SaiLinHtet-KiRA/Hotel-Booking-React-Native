import { BookingsDocument, Bookings, BookingsSchema } from "./Bookings.model";
import BookingsRepo from "./Bookings.repo";
import BookingsServiceType from "./interface/Bookings.service.type";
import { validateZod } from "../util/validate";
import { UpdateQuery } from "mongoose";

class BookingsService implements BookingsServiceType {
  async getBookings(): Promise<BookingsDocument[]> {
    try {
      const Bookingss = await BookingsRepo.get();
      return Bookingss;
    } catch (error) {
      throw error;
    }
  }
  async getBooking(id: string): Promise<BookingsDocument> {
    try {
      return await BookingsRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  async createBookings(data: Bookings): Promise<BookingsDocument> {
    try {
      const BookingsData = validateZod(BookingsSchema, data);

      const newBookings = await BookingsRepo.create(BookingsData);

      return newBookings;
    } catch (error) {
      throw error;
    }
  }
  async updateBookings(
    id: string,
    data: UpdateQuery<Bookings>,
  ): Promise<BookingsDocument> {
    try {
      return await BookingsRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteBookings(id: string): Promise<BookingsDocument> {
    try {
      return await BookingsRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingsService();
