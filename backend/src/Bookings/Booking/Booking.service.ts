import { BookingDocument, Booking, BookingSchema } from "./Booking.model";
import BookingRepo from "./Booking.repo";
import BookingServiceType from "./interface/Booking.service.type";
import { validateZod } from "../../util/validate";
import BookingsService from "../Bookings.service";

class BookingService implements BookingServiceType {
  async getBookings(): Promise<BookingDocument[]> {
    try {
      const Bookings = await BookingRepo.get();
      return Bookings;
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
  async updateBooking(id: string, data: Booking): Promise<BookingDocument> {
    try {
      try {
        const BookingData = validateZod(BookingSchema, data);

        return await BookingRepo.update(id, BookingData);
      } catch (error) {
        throw error;
      }
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
