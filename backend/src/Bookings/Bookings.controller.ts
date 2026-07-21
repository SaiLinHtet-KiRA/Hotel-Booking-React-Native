import { Request, Response } from "express";
import { BookingsDocument } from "./Bookings.model";
import BookingsService from "./Bookings.service";
import BookingsControllerType from "./interface/Bookings.controller.type";

class BookingsController implements BookingsControllerType {
  async getBookings(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: BookingsDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Bookings = await BookingsService.getBooking(id);

      res
        .status(200)
        .json({ message: "Bookings retrieved successfully", data: Bookings });
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingsController();
