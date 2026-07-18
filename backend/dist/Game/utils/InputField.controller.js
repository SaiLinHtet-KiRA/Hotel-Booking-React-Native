"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputField_service_1 = __importDefault(require("./InputField.service"));
class InputFieldController {
    async updateInputField(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedInputFiled = await InputField_service_1.default.updateInputField(id, data);
            res
                .status(200)
                .json({
                message: "Input field updated successfully",
                data: updatedInputFiled,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new InputFieldController();
