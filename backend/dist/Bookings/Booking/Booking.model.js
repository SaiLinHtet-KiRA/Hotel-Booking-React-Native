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
exports.BookingSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const Room_service_1 = __importDefault(require("../../Room/Room.service"));
const DateToNumber_1 = require("../../helper/DateToNumber");
exports.BookingSchema = zod_1.z.object({
    user: zod_1.z.any().refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
    room: zod_1.z.any().refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
    bookings: zod_1.z.any().refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
    startDate: zod_1.z.coerce.date({ error: "Start date is required." }),
    endDate: zod_1.z.coerce.date({ error: "End date is required." }),
    status: zod_1.z
        .enum(["pending", "confirmed", "cancelled"], {
        error: "Status must be pending, confirmed, or cancelled",
    })
        .default("pending"),
});
const DSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    room: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    bookings: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
}, { versionKey: false, timestamps: true });
DSchema.pre("save", async function () {
    if (this.isNew) {
        const room = await Room_service_1.default.updateRoom(this.room, { status: "busy" });
        this.price =
            room.price *
                (((0, DateToNumber_1.DateToNumber)(this.endDate) - (0, DateToNumber_1.DateToNumber)(this.startDate)) /
                    (1000 * 60 * 60 * 24));
    }
});
const BookingModel = mongoose_1.default.connection
    .useDb("Booking")
    .model("Booking", DSchema);
exports.default = BookingModel;
