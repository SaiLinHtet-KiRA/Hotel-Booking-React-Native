"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("../handler");
const errors_1 = require("../errors");
describe("HandleErrorWithLogger", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });
    it("handles ValidationError with 400 status", () => {
        const error = new errors_1.ValidationError("invalid input");
        (0, handler_1.HandleErrorWithLogger)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "invalid input",
            data: null,
        });
    });
    it("handles AuthorizeError with 403 status", () => {
        const error = new errors_1.AuthorizeError("access denied");
        (0, handler_1.HandleErrorWithLogger)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: "access denied",
            data: null,
        });
    });
    it("handles NotFoundError with 404 status", () => {
        const error = new errors_1.NotFoundError("resource not found");
        (0, handler_1.HandleErrorWithLogger)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "resource not found",
            data: null,
        });
    });
    it("handles unknown errors with 500 status", () => {
        const error = new Error("something went wrong");
        (0, handler_1.HandleErrorWithLogger)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "something went wrong",
            data: null,
        });
    });
    it("handles APIError with 500 status", () => {
        const error = new errors_1.APIError("internal error");
        (0, handler_1.HandleErrorWithLogger)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "internal error",
            data: null,
        });
    });
    it("handles error with default message when message property is missing", () => {
        const error = {};
        (0, handler_1.HandleErrorWithLogger)(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
