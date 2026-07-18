"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_NAME = exports.ADMIN_PASSWORD = exports.FRONTEND_URL = exports.BACKEND_URL = exports.SECRET = void 0;
_a = {
    SECRET: process.env.SECRET || "edenshopsai123pol",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:4000",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    ADMIN_NAME: process.env.ADMIN_NAME || "DefaultAdmin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123pass",
}, exports.SECRET = _a.SECRET, exports.BACKEND_URL = _a.BACKEND_URL, exports.FRONTEND_URL = _a.FRONTEND_URL, exports.ADMIN_PASSWORD = _a.ADMIN_PASSWORD, exports.ADMIN_NAME = _a.ADMIN_NAME;
