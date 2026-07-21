import mongoose, { Schema, HydratedDocument } from "mongoose";
import { z } from "zod";

export const RoomSchema = z.object({
  number: z.coerce
    .number({ error: "Number field is missing" })
    .min(1, { error: "Number must start from 1" }),
  type: z.enum(["single bed", "double bed", "family", "deluxe", "suite"], {
    error: "Type field is missing",
  }),
  photo: z
    .array(
      z
        .string({ message: "Each photo must be a string." })
        .url({ message: "Each photo must be a valid URL." }),
      {
        message: "Photo is required.",
      },
    )
    .min(1, { message: "At least one photo is required." })
    .optional(),
  capacity: z.coerce
    .number({ error: "Capacity field is missing" })
    .min(1, { error: "Must start from 1" })
    .max(5, "Only 5 people can live"),
  price: z.coerce
    .number({ error: "Price field is missing" })
    .min(1, { error: "Price can't be last than 0" }),
  status: z.enum(["available", "busy", "maintenance"], {
    error: "Type field is missing",
  }),
});

export type Room = z.infer<typeof RoomSchema>;

export type RoomDocument = HydratedDocument<Room>;

const DSchema = new Schema<RoomDocument>(
  {
    number: { type: Number, min: 1, required: true },
    type: {
      type: String,
      enum: ["single bed", "double bed", "family", "deluxe", "suite"],
      required: true,
    },
    capacity: { type: Number, min: 1, max: 4, required: true },
    price: { type: Number, min: 1, required: true },
    status: {
      type: String,
      enum: ["available", "busy", "maintenance"],
      default: "available",
    },
    photo: { type: [String], default: [] },
  },
  { versionKey: false, timestamps: true },
);

const RoomModel = mongoose.connection.useDb("Room").model("Room", DSchema);

export default RoomModel;
