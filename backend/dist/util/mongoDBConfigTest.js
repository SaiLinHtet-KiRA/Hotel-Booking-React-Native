"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbDisconnect = exports.dbConnect = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
const dbConnect = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
    }
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose_1.default.connect(uri);
};
exports.dbConnect = dbConnect;
const dbDisconnect = async () => {
    await mongoose_1.default.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
};
exports.dbDisconnect = dbDisconnect;
