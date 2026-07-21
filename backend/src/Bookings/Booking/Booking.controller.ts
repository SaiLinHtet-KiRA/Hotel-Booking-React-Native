import { Request, Response } from "express";
import { Booking, BookingDocument } from "./Booking.model";
import BookingControllerType from "./interface/Booking.controller.type";
import BookingService from "./Booking.service";
import { PaginationQuery } from "./interface/Booking.query.type";

class BookingController implements BookingControllerType {
  async getBookings(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: BookingDocument[]; size: number }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const data = await BookingService.getBookings(query);

      res
        .status(200)
        .json({ message: "Booking retrieved successfully", ...data });
    } catch (error) {
      throw error;
    }
  }
  async getBooking(
    req: Request<{ id: string }>,
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
    req: Request<{ id: string }, unknown, Booking>,
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
    req: Request<Record<string, never>, unknown, Booking>,
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
    req: Request<{ id: string }>,
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
