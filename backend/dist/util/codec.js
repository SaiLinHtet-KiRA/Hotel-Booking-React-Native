"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encoder = encoder;
exports.decoder = decoder;
function encoder(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64");
}
function decoder(value) {
    const json = Buffer.from(value, "base64").toString("utf8");
    return JSON.parse(json);
}
