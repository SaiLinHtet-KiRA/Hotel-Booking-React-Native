"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateZod = validateZod;
const errors_1 = require("./error/errors");
function validateZod(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new errors_1.ValidationError(result.error.message[0]);
    }
    return result.data;
}
