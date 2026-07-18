"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.GameSchema = zod_1.z.object({
    id: zod_1.z.coerce.number({ error: "Id must be number!!" }).positive().min(0),
    name: zod_1.z.string("Name field is missing in your data"),
    icon: zod_1.z.string().optional(),
    background: zod_1.z.string().optional(),
    play_store: zod_1.z.string().optional(),
    app_store: zod_1.z.string().optional(),
    about: zod_1.z.string().optional(),
    active: zod_1.z.coerce.boolean().optional(),
    form: zod_1.z
        .any()
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    })
        .optional(),
});
const DSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true,
    },
    icon: { type: String },
    background: { type: String },
    play_store: { type: String },
    app_store: { type: String },
    about: { type: String },
    active: { type: Boolean, default: false },
    form: { type: mongoose_1.Schema.ObjectId },
    package_col: { type: mongoose_1.Schema.ObjectId },
}, { timestamps: true, versionKey: false });
const GameModel = mongoose_1.connection.useDb("Game").model("Game", DSchema);
exports.default = GameModel;
