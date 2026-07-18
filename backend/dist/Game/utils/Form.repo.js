"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const Form_model_1 = __importDefault(require("./Form.model"));
const InputField_model_1 = __importDefault(require("./InputField.model"));
class FormRepo {
    async getByID(id) {
        try {
            const Form = await Form_model_1.default.findById(id).populate({
                path: "input_field",
                model: InputField_model_1.default,
            });
            if (Form)
                return Form;
            throw new errors_1.NotFoundError(`${id} was not found in Form Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newForm = new Form_model_1.default(data);
            return await newForm.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Form = await Form_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            }).populate({
                path: "input_field",
                model: InputField_model_1.default,
            });
            if (Form)
                return Form;
            throw new errors_1.NotFoundError(`${id} was not found in Form Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Form = await Form_model_1.default.findByIdAndDelete(id);
            if (Form)
                return Form;
            throw new errors_1.NotFoundError(`${id} was not found in Form Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new FormRepo();
