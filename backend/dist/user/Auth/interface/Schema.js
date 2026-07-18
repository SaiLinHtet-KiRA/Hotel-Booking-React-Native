"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    name: zod_1.z.string({ error: "Name field is missing!!!" }),
    password: zod_1.z
        .string({ error: "Password field is missing!!!" })
        .min(8, "Password must be at least 8 characters"),
});
