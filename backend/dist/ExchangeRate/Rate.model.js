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
exports.RateSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
exports.RateSchema = zod_1.z.object({
    value: zod_1.z.coerce.number({ error: "Value field is missing!!!" }),
    currency: zod_1.z.string({ error: "Currency field is missing!!!" }),
    profit: zod_1.z
        .coerce.number({ error: "Value field is missing!!!" })
        .max(100, { error: "Value of value field cann't be greater than 100" })
        .positive(),
});
const DSchema = new mongoose_1.Schema({
    value: {
        type: Number,
        default: 0,
        required: [true, "Value field is missing"],
    },
    currency: {
        type: String,
        unique: true,
        index: true,
        required: [true, "Csurrency field is missing"],
    },
    profit: {
        type: Number,
        default: 0,
        required: [true, "Profit field is missing"],
    },
}, { versionKey: false });
const RateModel = mongoose_1.default.connection
    .useDb("Rate")
    .model("Rate", DSchema);
exports.default = RateModel;
