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
exports.RatingsSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const Ratings_service_1 = __importDefault(require("./Ratings.service"));
exports.RatingsSchema = zod_1.z.object({
    ratings: zod_1.z.array(zod_1.z
        .any()
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    })
        .optional()),
});
const DSchema = new mongoose_1.Schema({
    average: { type: Number, default: 0 },
    ratings: { type: [mongoose_1.Schema.ObjectId], default: [] },
}, { versionKey: false });
DSchema.pre("findOneAndUpdate", async function () {
    const { _id } = this.getQuery();
    const average = await Ratings_service_1.default.calculateAverageRating(_id);
    this.set({
        average,
    });
});
const RatingsModel = mongoose_1.default.connection
    .useDb("Ratings")
    .model("Ratings", DSchema);
exports.default = RatingsModel;
