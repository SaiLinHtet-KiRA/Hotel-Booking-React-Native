"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateToNumber = DateToNumber;
function DateToNumber(date) {
    return new Date(date).getTime();
}
