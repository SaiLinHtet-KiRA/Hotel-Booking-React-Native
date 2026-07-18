"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleUnCaughtException = exports.HandleErrorWithLogger = void 0;
const errors_1 = require("./errors");
const HandleErrorWithLogger = (error, req, res, _next) => {
    let reportError = true;
    let status = 500;
    let message = error.message;
    [errors_1.NotFoundError, errors_1.ValidationError, errors_1.AuthorizeError].forEach((typeOfError) => {
        if (error instanceof typeOfError) {
            reportError = false;
            status = error.status;
            message = error.message;
        }
    });
    if (reportError) {
        console.log(error);
    }
    else {
        console.log(error);
    }
    return res.status(status).json({ message, data: null });
};
exports.HandleErrorWithLogger = HandleErrorWithLogger;
const HandleUnCaughtException = async (error) => {
    console.log(error);
    process.exit(1);
};
exports.HandleUnCaughtException = HandleUnCaughtException;
