"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("../router/index.route"));
const handler_1 = require("../util/error/handler");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config/config");
const express_session_1 = __importDefault(require("express-session"));
class ExpressServer {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.app.set("trust proxy", 1);
        this.app.use((0, cors_1.default)({
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        }));
        this.app.use((0, express_session_1.default)({
            secret: config_1.SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: "lax",
            },
        }));
        this.app.use(express_1.default.json());
        this.app.use(index_route_1.default);
        this.app.use(handler_1.HandleErrorWithLogger);
    }
    startServer() {
        this.app.listen(4000, () => console.log("Express server is started in port ", 4000));
    }
}
exports.default = ExpressServer;
