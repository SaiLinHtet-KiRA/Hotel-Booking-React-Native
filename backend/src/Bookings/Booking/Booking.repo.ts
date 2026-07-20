import { NotFoundError } from "../../util/error/errors";
import BookingModel, { BookingDocument, Booking } from "./Booking.model";
import BookingRepoType from "./interface/Booking.repo.type";

class BookingRepo implements BookingRepoType {
  async get(): Promise<BookingDocument[]> {
    try {
      const Bookings = await BookingModel.find();
      if (Bookings) return Bookings;
      throw new Error(`Something was wrong in BookingRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<BookingDocument> {
    try {
      const Booking = await BookingModel.findById(id);
      if (Booking) return Booking;
      throw new NotFoundError(`${id} was not found in Rate Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Booking): Promise<BookingDocument> {
    try {
      const newBooking = new BookingModel(data);
      return await newBooking.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: Booking): Promise<BookingDocument> {
    try {
      const Booking = await BookingModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (Booking) return Booking;
      throw new NotFoundError(`${id} was not found in Booking Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<BookingDocument> {
    try {
      const Booking = await BookingModel.findByIdAndDelete(id);
      if (Booking) return Booking;
      throw new NotFoundError(`${id} was not found in Booking Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingRepo();
