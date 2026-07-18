"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextSequence = getNextSequence;
const mongoose_1 = __importDefault(require("mongoose"));
const Counter = mongoose_1.default.connection.useDb("Counter").model("Counter", new mongoose_1.default.Schema({
    _id: String,
    sequence_value: Number,
}));
async function getNextSequence(name) {
    const counter = await Counter.findOneAndUpdate({ _id: name }, { $inc: { sequence_value: 1 } }, {
        new: true,
        upsert: true,
    });
    return counter.sequence_value;
}
