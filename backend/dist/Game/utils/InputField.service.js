"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputField_model_1 = require("./InputField.model");
const InputField_repo_1 = __importDefault(require("./InputField.repo"));
const validate_1 = require("../../util/validate");
class InputFieldService {
    async getInputField(id) {
        try {
            return await InputField_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createInputField(data) {
        try {
            const InputFieldData = (0, validate_1.validateZod)(InputField_model_1.InputFieldSchema, data);
            const newInputField = await InputField_repo_1.default.create(InputFieldData);
            return newInputField;
        }
        catch (error) {
            throw error;
        }
    }
    async updateInputField(id, data) {
        try {
            const InputFieldData = (0, validate_1.validateZod)(InputField_model_1.InputFieldSchema, data);
            return await InputField_repo_1.default.update(id, InputFieldData);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteInputField(id) {
        try {
            return await InputField_repo_1.default.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new InputFieldService();
