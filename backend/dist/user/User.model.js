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
exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const Counter_1 = require("../helper/Counter");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Bookings_service_1 = __importDefault(require("../Bookings/Bookings.service"));
exports.UserSchema = zod_1.z.object({
    name: zod_1.z.string({ error: "Name field is missing!!!" }),
    email: zod_1.z.string({ error: "Name field is missing!!!" }),
    password: zod_1.z
        .string({ error: "Password field is missing!!!" })
        .min(8, "Password must be at least 8 characters"),
    role: zod_1.z
        .string({ error: "Role field is missing!!!" })
        .refine((value) => value == "admin" || value == "user", {
        message: "Invalid Role",
    })
        .optional(),
});
const DSchema = new mongoose_1.Schema({
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
    bookings: { type: mongoose_1.Schema.Types.ObjectId },
}, { versionKey: false, timestamps: true });
DSchema.pre("save", async function () {
    if (this.isNew) {
        this.id = (await (0, Counter_1.getNextSequence)("UserId"));
        this.bookings = (await Bookings_service_1.default.createBookings({ bookings: [] }))._id;
    }
});
DSchema.pre("save", async function () {
    if (this.isNew || this.isModified("password")) {
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
    }
});
const UserModel = mongoose_1.default.connection.useDb("User").model("User", DSchema);
exports.default = UserModel;
