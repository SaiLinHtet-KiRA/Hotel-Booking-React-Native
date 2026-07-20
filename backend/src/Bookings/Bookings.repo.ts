import UserModel from "../User/User.model";
import { NotFoundError } from "../util/error/errors";
import BookingModel from "./Booking/Booking.model";
import BookingsModel, { Bookings, BookingsDocument } from "./Bookings.model";
import BookingsRepoType from "./interface/Bookings.repo.type";

class BookingsRepo implements BookingsRepoType {
  async get(): Promise<BookingsDocument[]> {
    try {
      const Bookings = await BookingsModel.find();
      if (Bookings) return Bookings;
      throw new Error(`Something was wrong in BookingsRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<BookingsDocument> {
    try {
      const Bookings = await BookingsModel.findById(id).populate({
        path: "Bookings",
        model: BookingModel,
        populate: { path: "user", model: UserModel },
      });
      if (Bookings) return Bookings;
      throw new NotFoundError(`${id} was not found in Rate Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Bookings): Promise<BookingsDocument> {
    try {
      const newBookings = new BookingsModel(data);
      return await newBookings.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: Bookings): Promise<BookingsDocument> {
    try {
      const Bookings = await BookingsModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (Bookings) return Bookings;
      throw new NotFoundError(`${id} was not found in Bookings Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<BookingsDocument> {
    try {
      const Bookings = await BookingsModel.findByIdAndDelete(id);
      if (Bookings) return Bookings;
      throw new NotFoundError(`${id} was not found in Bookings Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingsRepo();
