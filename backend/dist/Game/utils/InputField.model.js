"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFieldSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.InputFieldSchema = zod_1.z.object({
    id: zod_1.z.coerce.number({ error: "Id must be number!!" }).positive().min(0),
    name: zod_1.z.string("Name field is missing in your data"),
    type: zod_1.z.string("Type field is missing in your data"),
    title: zod_1.z.string("Title field is missing in your data"),
    placeholder: zod_1.z.string("Placeholder field is missing in your data"),
    options: zod_1.z.array(zod_1.z.object({
        value: zod_1.z.string(),
        text: zod_1.z.string(),
    })),
});
const DSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: [true, "Id is required"],
        unique: true,
        trim: true,
        min: 0,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    placeholder: { type: String, required: true },
    options: {
        type: [
            {
                value: { type: String },
                text: { type: String },
            },
        ],
        required: true,
        default: [],
    },
}, { timestamps: true, versionKey: false });
const InputFieldModel = mongoose_1.connection
    .useDb("Game")
    .model("InputField", DSchema);
exports.default = InputFieldModel;
