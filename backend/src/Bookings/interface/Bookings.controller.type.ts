import { Request, Response } from "express";
import { BookingsDocument } from "../Bookings.model";

export default interface BookingsControllerType {
  getBookings(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: BookingsDocument }>,
  ): Promise<void>;
}
