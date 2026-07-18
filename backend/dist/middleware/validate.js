"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../util/error/errors");
const validate = (schema) => {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next(new errors_1.ValidationError(result.error.message));
        }
        req.body = result.data;
        next();
    };
};
exports.default = validate;
