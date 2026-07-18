"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const InputField_model_1 = __importDefault(require("./InputField.model"));
class InputFieldRepo {
    async getByID(id) {
        try {
            const InputField = await InputField_model_1.default.findById(id);
            if (InputField)
                return InputField;
            throw new errors_1.NotFoundError(`${id} was not found in InputField Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newInputField = new InputField_model_1.default(data);
            return await newInputField.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const InputField = await InputField_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (InputField)
                return InputField;
            throw new errors_1.NotFoundError(`${id} was not found in InputField Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const InputField = await InputField_model_1.default.findByIdAndDelete(id);
            if (InputField)
                return InputField;
            throw new errors_1.NotFoundError(`${id} was not found in InputField Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new InputFieldRepo();
