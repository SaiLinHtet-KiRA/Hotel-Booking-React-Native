"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.PackageSchema = zod_1.z.object({
    id: zod_1.z.string({ error: "Id must be string!!" }),
    name: zod_1.z.string("Name field is missing in your data"),
    icon: zod_1.z.string().optional(),
    price: zod_1.z.object({
        usd: zod_1.z.number({ message: "USD price must be a number" }),
        mmk: zod_1.z.number({ message: "MMK price must be a number" }),
        thb: zod_1.z.number({ message: "THB price must be a number" }),
    }),
    sale_price: zod_1.z.object({
        usd: zod_1.z.number({ message: "USD sale price must be a number" }),
        mmk: zod_1.z.number({ message: "MMK sale price must be a number" }),
        thb: zod_1.z.number({ message: "THB sale price must be a number" }),
    }),
    discount_price: zod_1.z.object({
        usd: zod_1.z.number({ message: "USD discount price must be a number" }),
        mmk: zod_1.z.number({ message: "MMK discount price must be a number" }),
        thb: zod_1.z.number({ message: "THB discount price must be a number" }),
    }),
    active: zod_1.z.coerce.boolean().optional(),
    game: zod_1.z
        .any()
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    })
        .optional(),
    package_collection: zod_1.z
        .any()
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    })
        .optional(),
});
const DSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Id is required"],
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true,
    },
    icon: { type: String },
    price: {
        usd: { type: Number, required: true },
        mmk: { type: Number, required: true },
        thb: { type: Number, required: true },
    },
    sale_price: {
        usd: { type: Number, required: true },
        mmk: { type: Number, required: true },
        thb: { type: Number, required: true },
    },
    discount_price: {
        usd: { type: Number, required: true },
        mmk: { type: Number, required: true },
        thb: { type: Number, required: true },
    },
    active: { type: Boolean, default: false },
    game: { type: mongoose_1.Schema.ObjectId, ref: "Game" },
    package_collection: { type: mongoose_1.Schema.ObjectId, ref: "PackageCollection" },
}, { timestamps: true, versionKey: false });
const PackageModel = mongoose_1.connection
    .useDb("Package")
    .model("Package", DSchema);
exports.default = PackageModel;
