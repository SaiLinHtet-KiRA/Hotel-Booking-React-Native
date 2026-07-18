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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const Counter_1 = require("../helper/Counter");
exports.RoomSchema = zod_1.z.object({
    startTime: zod_1.z.coerce.date({ error: "startTime field is missing!!!" }),
    endTime: zod_1.z.coerce.date({ error: "startTime field is missing!!!" }),
    userId: zod_1.z.any().refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
});
const DSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        default: 0,
    },
    startTime: {
        type: Date,
        required: [true, "Start Time field is missing"],
    },
    endTime: {
        type: Date,
        required: [true, "End Time field is missing"],
    },
    userId: {
        type: mongoose_1.Schema.ObjectId,
        required: [true, "User Id field is missing"],
    },
}, { versionKey: false });
DSchema.pre("save", async function () {
    if (this.isNew) {
        this.id = (await (0, Counter_1.getNextSequence)("RoomId"));
    }
});
const RoomModel = mongoose_1.default.connection.useDb("Room").model("Room", DSchema);
exports.default = RoomModel;
