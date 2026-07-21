import { Request, Response } from "express";
import { Booking, BookingDocument } from "../Booking.model";
import { PaginationQuery } from "./Booking.query.type";

export default interface BookingControllerType {
  getBookings(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: BookingDocument[]; size: number }>,
  ): Promise<void>;
  getBooking(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
  updateBooking(
    req: Request<{ id: string }, unknown, Booking>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
  createBooking(
    req: Request<Record<string, never>, unknown, Booking>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
  deleteBooking(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: BookingDocument }>,
  ): Promise<void>;
}
