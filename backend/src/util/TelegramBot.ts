import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.BOT_TOKEN as string;

if (!TOKEN) {
  throw new Error("Missing BOT_TOKEN");
}

export default new TelegramBot(TOKEN, { polling: true });
