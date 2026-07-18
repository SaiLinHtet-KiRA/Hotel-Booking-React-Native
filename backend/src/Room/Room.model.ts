import mongoose, { Schema, HydratedDocument, Types } from "mongoose";
import { z } from "zod";
import { getNextSequence } from "../helper/Counter";

export const RoomSchema = z.object({
  startTime: z.coerce.date({ error: "startTime field is missing!!!" }),
  endTime: z.coerce.date({ error: "startTime field is missing!!!" }),
  userId: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
});

export type Room = z.infer<typeof RoomSchema>;

export type RoomDocument = HydratedDocument<
  Room & {
    id: number;
  }
>;

const DSchema = new Schema<RoomDocument>(
  {
    id: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
      required: [true, "Start Time field is missing"],
    },
    endTime: {
      type: Date,
      required: [true, "End Time field is missing"],
    },
    userId: {
      type: Schema.ObjectId,
      required: [true, "User Id field is missing"],
    },
  },
  { versionKey: false },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    this.id = (await getNextSequence("RoomId"))!;
  }
});

const RoomModel = mongoose.connection.useDb("Room").model("Room", DSchema);

export default RoomModel;
