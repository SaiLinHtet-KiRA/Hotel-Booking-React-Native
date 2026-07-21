"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("../router/index.route"));
const handler_1 = require("../util/error/handler");
const cors_1 = __importDefault(require("cors"));
const jwt_1 = require("../util/jwt");
class ExpressServer {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.app.set("trust proxy", 1);
        this.app.use((0, cors_1.default)({
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            credentials: true,
        }));
        this.app.use(express_1.default.json());
        this.app.use((req, _res, next) => {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                try {
                    const token = authHeader.split(" ")[1];
                    const payload = (0, jwt_1.verifyToken)(token);
                    req.userId = payload.userId;
                    req.userRole = payload.role;
                    req.userBanned = payload.banned;
                }
                catch {
                    // token invalid, continue without auth
                }
            }
            next();
        });
        this.app.use(index_route_1.default);
        this.app.use(handler_1.HandleErrorWithLogger);
    }
    startServer() {
        this.app.listen(4000, () => console.log("Express server is started in port ", 4000));
    }
}
exports.default = ExpressServer;
