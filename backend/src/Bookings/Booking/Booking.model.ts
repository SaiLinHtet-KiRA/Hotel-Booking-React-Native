import mongoose, { Schema, Types, HydratedDocument } from "mongoose";
import { z } from "zod";
import RoomService from "../../Room/Room.service";
import { DateToNumber } from "../../helper/DateToNumber";

export const BookingSchema = z.object({
  user: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
  room: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),

  bookings: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
  startDate: z.coerce.date({ error: "Start date is required." }),
  endDate: z.coerce.date({ error: "End date is required." }),
  status: z
    .enum(["pending", "confirmed", "cancelled"], {
      error: "Status must be pending, confirmed, or cancelled",
    })
    .default("pending"),
});

export type Booking = z.infer<typeof BookingSchema>;

export type BookingDocument = HydratedDocument<
  Booking & {
    price: number;
  }
>;

const DSchema = new Schema<BookingDocument>(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    room: { type: Schema.Types.ObjectId, required: true },
    bookings: { type: Schema.Types.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { versionKey: false, timestamps: true },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    const room = await RoomService.updateRoom(this.room, { status: "busy" });
    this.price =
      room.price *
      ((DateToNumber(this.endDate) - DateToNumber(this.startDate)) /
        (1000 * 60 * 60 * 24));
  }
});

const BookingModel = mongoose.connection
  .useDb("Booking")
  .model<BookingDocument>("Booking", DSchema);

export default BookingModel;
