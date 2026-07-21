import mongoose, { Schema, Types, HydratedDocument } from "mongoose";
import { z } from "zod";
import RatingsService from "./Ratings.service";

export const RatingsSchema = z.object({
  ratings: z.array(
    z
      .any()
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
      })
      .optional(),
  ),
});

export type Ratings = z.infer<typeof RatingsSchema>;

export type RatingsDocument = HydratedDocument<
  Ratings & {
    average: number;
    size: number;
  }
>;

const DSchema = new Schema<RatingsDocument>(
  {
    average: { type: Number, default: 0 },
    size: { type: Number, default: 0 },

    ratings: { type: [Schema.ObjectId], default: [] },
  },
  { versionKey: false },
);

DSchema.pre("findOneAndUpdate", async function () {
  const { _id } = this.getQuery();

  const average = await RatingsService.calculateAverageRating(_id);

  this.set({
    average,
  });
});

const RatingsModel = mongoose.connection
  .useDb("Ratings")
  .model<RatingsDocument>("Ratings", DSchema);

export default RatingsModel;
