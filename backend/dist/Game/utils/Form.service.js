"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_repo_1 = __importDefault(require("./Form.repo"));
const InputField_service_1 = __importDefault(require("./InputField.service"));
const Game_service_1 = __importDefault(require("../Game.service"));
class FormService {
    async getForm(id) {
        try {
            return await Form_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createForm(data) {
        try {
            const inputFieldDocs = await Promise.all(data.map((inputField) => InputField_service_1.default.createInputField(inputField)));
            const inputFieldIds = inputFieldDocs.map((doc) => doc._id);
            return await Form_repo_1.default.create({
                input_field: inputFieldIds,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateForm(id, data) {
        try {
            try {
                return await Form_repo_1.default.update(id, data);
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addInputField(id, data) {
        try {
            const createdInputFieldService = await InputField_service_1.default.createInputField(data);
            return await this.updateForm(id, {
                $push: { input_field: createdInputFieldService._id },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async removeInputField(form_id, inputField_id) {
        try {
            const removedInputField = await InputField_service_1.default.deleteInputField(inputField_id);
            return await this.updateForm(form_id, {
                $pull: { input_field: removedInputField._id },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteForm(game_id, form_id) {
        try {
            const existedForm = await this.getForm(form_id);
            for (const inputField_id of existedForm.input_field) {
                await InputField_service_1.default.deleteInputField(inputField_id.toString());
            }
            await Game_service_1.default.updateGame(game_id, {
                $unset: {
                    form: 1,
                },
            });
            return await Form_repo_1.default.delete(form_id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new FormService();
