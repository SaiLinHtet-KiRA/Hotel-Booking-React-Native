import mongoose, { Schema, HydratedDocument, Types } from "mongoose";
import { z } from "zod";
import { RatingsDocument } from "../Ratings/Ratings.model";
import RatingsService from "../Ratings/Ratings.service";

export const RoomSchema = z.object({
  number: z
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
    .min(1, { message: "At least one photo is required." }),
  capacity: z
    .number({ error: "Capacity field is missing" })
    .min(1, { error: "Must start from 1" })
    .max(5, "Only 5 people can live"),
  price: z
    .number({ error: "Price field is missing" })
    .min(1, { error: "Price can't be last than 0" }),
  status: z.enum(["available", "busy", "maintenance"], {
    error: "Type field is missing",
  }),
});

export type Room = z.infer<typeof RoomSchema>;

export type RoomDocument = HydratedDocument<
  Room & {
    ratings: RatingsDocument | Types.ObjectId;
  }
>;

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
    ratings: {
      type: Schema.ObjectId,
    },
    photo: { type: [String], default: [] },
  },
  { versionKey: false, timestamps: true },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    const newRatings = await RatingsService.createRatings({ ratings: [] });
    this.ratings = newRatings._id;
  }
});

const RoomModel = mongoose.connection.useDb("Room").model("Room", DSchema);

export default RoomModel;
