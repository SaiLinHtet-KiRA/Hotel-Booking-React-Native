import mongoose, { Schema, Types, HydratedDocument } from "mongoose";
import { z } from "zod";

export const RatingSchema = z.object({
  user: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
  RatingsId: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
  rating: z
    .number({ error: "Rating is required." })
    .min(0, { error: "Rating must be at least 0." })
    .max(5, { error: "Rating cannot exceed 5." }),
  feed_back: z
    .string()
    .max(100, { error: "Feedback must be at most 100 characters." })
    .optional(),
});

export type Rating = z.infer<typeof RatingSchema>;

export type RatingDocument = HydratedDocument<Rating>;

const DSchema = new Schema<RatingDocument>(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    RatingsId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    feed_back: { type: String, maxlength: 100 },
  },
  { versionKey: false },
);

const RatingModel = mongoose.connection
  .useDb("Rating")
  .model<RatingDocument>("Rating", DSchema);

export default RatingModel;
