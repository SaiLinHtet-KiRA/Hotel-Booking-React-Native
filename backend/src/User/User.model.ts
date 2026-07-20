import mongoose, { Schema, HydratedDocument } from "mongoose";
import { z } from "zod";
import { getNextSequence } from "../helper/Counter";
import bcrypt from "bcrypt";

export const UserSchema = z.object({
  name: z.string({ error: "Name field is missing!!!" }),
  email: z.string({ error: "Name field is missing!!!" }),
  password: z
    .string({ error: "Password field is missing!!!" })
    .min(8, "Password must be at least 8 characters"),
  role: z
    .string({ error: "Role field is missing!!!" })
    .refine((value) => value == "admin" || value == "user", {
      message: "Invalid Role",
    })
    .optional(),
});

export type User = z.infer<typeof UserSchema>;

export type UserDocument = HydratedDocument<User & { id: number }>;

const DSchema = new Schema<UserDocument>(
  {
    id: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
      unique: [true, "This name is already existed"],
      required: [true, "Value field is missing"],
    },
    password: {
      type: String,
      required: [true, "Password field is missing"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "Role field is missing"],
      default: "user",
    },
  },
  { versionKey: false },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    this.id = (await getNextSequence("UserId"))!;
  }
});

DSchema.pre("save", async function () {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const UserModel = mongoose.connection.useDb("User").model("User", DSchema);

export default UserModel;
