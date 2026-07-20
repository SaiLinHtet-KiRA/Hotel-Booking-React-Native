import { Request, Response } from "express";
import { Booking, BookingDocument } from "./Booking.model";
import BookingControllerType from "./interface/Booking.controller.type";
import BookingService from "./Booking.service";

class BookingController implements BookingControllerType {
  async getBooking(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Booking = await BookingService.getBooking(id);

      res
        .status(200)
        .json({ message: "Booking retrieved successfully", data: Booking });
    } catch (error) {
      throw error;
    }
  }
  async updateBooking(
    req: Request<{ id: string }, null, Booking, null>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const Booking = await BookingService.updateBooking(id, body);

      res
        .status(200)
        .json({ message: "Booking retrieved successfully", data: Booking });
    } catch (error) {
      throw error;
    }
  }
  async createBooking(
    req: Request<{}, {}, Booking>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void> {
    try {
      const body = req.body;
      const Booking = await BookingService.createBooking(body);

      res
        .status(200)
        .json({ message: "Booking retrieved successfully", data: Booking });
    } catch (error) {
      throw error;
    }
  }
  async deleteBooking(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Booking = await BookingService.deleteBooking(id);

      res
        .status(200)
        .json({ message: "Booking retrieved successfully", data: Booking });
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingController();
