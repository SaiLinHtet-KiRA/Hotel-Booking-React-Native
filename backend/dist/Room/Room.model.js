"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const Ratings_service_1 = __importDefault(require("../Ratings/Ratings.service"));
exports.RoomSchema = zod_1.z.object({
    number: zod_1.z
        .number({ error: "Number field is missing" })
        .min(1, { error: "Number must start from 1" }),
    type: zod_1.z.enum(["single bed", "double bed", "family", "deluxe", "suite"], {
        error: "Type field is missing",
    }),
    photo: zod_1.z
        .array(zod_1.z
        .string({ message: "Each photo must be a string." })
        .url({ message: "Each photo must be a valid URL." }), {
        message: "Photo is required.",
    })
        .min(1, { message: "At least one photo is required." }),
    capacity: zod_1.z
        .number({ error: "Capacity field is missing" })
        .min(1, { error: "Must start from 1" })
        .max(5, "Only 5 people can live"),
    price: zod_1.z
        .number({ error: "Price field is missing" })
        .min(1, { error: "Price can't be last than 0" }),
    status: zod_1.z.enum(["available", "busy", "maintenance"], {
        error: "Type field is missing",
    }),
});
const DSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.ObjectId,
    },
    photo: { type: [String], default: [] },
}, { versionKey: false, timestamps: true });
DSchema.pre("save", async function () {
    if (this.isNew) {
        const newRatings = await Ratings_service_1.default.createRatings({ ratings: [] });
        this.ratings = newRatings._id;
    }
});
const RoomModel = mongoose_1.default.connection.useDb("Room").model("Room", DSchema);
exports.default = RoomModel;
