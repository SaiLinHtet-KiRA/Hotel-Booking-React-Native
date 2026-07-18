"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_service_1 = __importDefault(require("./Form.service"));
class FormController {
    async getForm(req, res) {
        try {
            const { id } = req.params;
            const form = await Form_service_1.default.getForm(id);
            res
                .status(200)
                .json({ message: "Form retrieved successfully", data: form });
        }
        catch (error) {
            throw error;
        }
    }
    async removeInputField(req, res) {
        try {
            const { form_id, inputField_id } = req.params;
            const updatedForm = await Form_service_1.default.removeInputField(form_id, inputField_id);
            res
                .status(200)
                .json({
                message: "Input field removed successfully",
                data: updatedForm,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async addInputField(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedForm = await Form_service_1.default.addInputField(id, data);
            res
                .status(200)
                .json({ message: "Input field added successfully", data: updatedForm });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteForm(req, res) {
        try {
            const { form_id, game_id } = req.params;
            const updatedForm = await Form_service_1.default.deleteForm(game_id, form_id);
            res
                .status(200)
                .json({ message: "Form deleted successfully", data: updatedForm });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new FormController();
