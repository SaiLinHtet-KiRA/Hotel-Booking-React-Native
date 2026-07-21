import mongoose, { Schema, Types, HydratedDocument } from "mongoose";
import { z } from "zod";

export const BookingsSchema = z.object({
  bookings: z.array(
    z
      .any()
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
      })
      .optional(),
  ),
});

export type Bookings = z.infer<typeof BookingsSchema>;

export type BookingsDocument = HydratedDocument<
  Bookings & {
    size: number;
  }
>;

const DSchema = new Schema<BookingsDocument>(
  {
    bookings: { type: [Schema.ObjectId], default: [] },
    size: { type: Number, default: 0 },
  },
  { versionKey: false },
);

const BookingsModel = mongoose.connection
  .useDb("Bookings")
  .model<BookingsDocument>("Bookings", DSchema);

export default BookingsModel;
