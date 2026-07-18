"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
    throw new Error("Missing BOT_TOKEN");
}
exports.default = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
