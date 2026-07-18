"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./config/DB/mongoose");
const createDefaultAdmin_1 = require("./helper/createDefaultAdmin");
const index_1 = require("./server/index");
async function start() {
    await (0, mongoose_1.connectDB)();
    await (0, createDefaultAdmin_1.createDefaultAdmin)();
    index_1.express.startServer();
}
start();
