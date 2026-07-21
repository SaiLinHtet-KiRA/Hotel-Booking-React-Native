import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../../util/error/errors";
import BookingModel, { BookingDocument, Booking } from "./Booking.model";
import { PaginationQuery } from "./interface/Booking.query.type";
import BookingRepoType from "./interface/Booking.repo.type";

class BookingRepo implements BookingRepoType {
  async get({
    limit,
    page,
    status,
  }: PaginationQuery): Promise<BookingDocument[]> {
    try {
      const Bookings = await BookingModel.find(
        status ? { status: status } : {},
        {},
        page && limit ? { skip: page * limit, limit } : {},
      ).sort({ createdAt: -1 });
      if (Bookings) return Bookings;
      throw new Error(`Something was wrong in BookingRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getCount({ status }: PaginationQuery): Promise<number> {
    try {
      return await BookingModel.countDocuments(
        status ? { status: status } : {},
        {},
      );
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
  async update(
    id: string,
    data: UpdateQuery<Booking>,
  ): Promise<BookingDocument> {
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
