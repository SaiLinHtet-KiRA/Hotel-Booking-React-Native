import { Request, Response } from "express";
import { Booking, BookingDocument } from "../Booking.model";

export default interface BookingControllerType {
  getBooking(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
  updateBooking(
    req: Request<{ id: string }, null, Booking, null>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
  createBooking(
    req: Request<{}, {}, Booking>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
  deleteBooking(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
}
