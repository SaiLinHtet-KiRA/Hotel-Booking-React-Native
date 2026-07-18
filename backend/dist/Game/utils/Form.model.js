"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.FormSchema = zod_1.z.object({
    input_field: zod_1.z.array(zod_1.z.instanceof(mongoose_1.Types.ObjectId)),
});
const DSchema = new mongoose_1.Schema({
    input_field: { type: [mongoose_1.Schema.ObjectId] },
}, { timestamps: true, versionKey: false });
const FormModel = mongoose_1.connection.useDb("Game").model("Form", DSchema);
exports.default = FormModel;
