"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageCollectionSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.PackageCollectionSchema = zod_1.z.object({
    name: zod_1.z.string("Name field is missing in your data"),
});
const DSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true,
    },
    package: { type: [mongoose_1.Schema.ObjectId], default: [] },
    size: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });
const PackageCollectionModel = mongoose_1.connection
    .useDb("PackageCollection")
    .model("PackageCollection", DSchema);
exports.default = PackageCollectionModel;
