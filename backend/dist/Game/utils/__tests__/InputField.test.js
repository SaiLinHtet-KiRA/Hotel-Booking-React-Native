"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDBConfigTest_1 = require("../../../util/mongoDBConfigTest");
const InputField_repo_1 = __importDefault(require("../InputField.repo"));
const InputField_service_1 = __importDefault(require("../InputField.service"));
const index_1 = require("../../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mockInputFieldData = {
    id: 110,
    name: "id",
    type: "number",
    title: "User ID",
    placeholder: "User ID",
    options: [],
};
let createdInputFiled = null;
describe("InputField Service", () => {
    describe("InputField Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdInputFiled = null;
        });
        describe("CREATE INPUTFIELD", () => {
            it("WITH SUCCESS", async () => {
                createdInputFiled = await InputField_repo_1.default.create(mockInputFieldData);
                expect(createdInputFiled).not.toBeNull();
                expect(createdInputFiled._id).not.toBeNull();
                expect(createdInputFiled).toMatchObject({
                    id: mockInputFieldData.id,
                    name: mockInputFieldData.name,
                    type: mockInputFieldData.type,
                    title: mockInputFieldData.title,
                    placeholder: mockInputFieldData.placeholder,
                    options: mockInputFieldData.options,
                });
            });
            it("WITH ERROR", async () => {
                await expect(InputField_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("UPDATE INPUTFIELD", () => {
            it("WITH SUCCESS", async () => {
                const mockInputFieldData = {
                    id: 11,
                    name: "name",
                    type: "text",
                    title: "Order ID",
                    placeholder: "Order ID",
                    options: [
                        {
                            value: "Asia",
                            text: "Asia",
                        },
                    ],
                };
                const updatedInputFiled = await InputField_repo_1.default.update(createdInputFiled._id.toString(), mockInputFieldData);
                expect(updatedInputFiled).toMatchObject({
                    _id: createdInputFiled._id,
                    id: mockInputFieldData.id,
                    name: mockInputFieldData.name,
                    type: mockInputFieldData.type,
                    title: mockInputFieldData.title,
                    placeholder: mockInputFieldData.placeholder,
                    options: mockInputFieldData.options,
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(InputField_repo_1.default.update(mockIdString, {})).rejects.toThrow();
            });
        });
        describe("DELETE INPUTFIELD", () => {
            it("WITH SUCCESS", async () => {
                const DeletedInputField = await InputField_repo_1.default.delete(createdInputFiled._id.toString());
                expect(DeletedInputField).toMatchObject({
                    _id: createdInputFiled._id,
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(InputField_repo_1.default.delete(mockIdString)).rejects.toThrow();
            });
        });
    });
    describe("InputField Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdInputFiled = null;
        });
        describe("CREATE INPUTFIELD", () => {
            it("WITH SUCCESS", async () => {
                createdInputFiled =
                    await InputField_service_1.default.createInputField(mockInputFieldData);
                expect(createdInputFiled).not.toBeNull();
                expect(createdInputFiled._id).not.toBeNull();
                expect(createdInputFiled).toMatchObject({
                    id: mockInputFieldData.id,
                    name: mockInputFieldData.name,
                    type: mockInputFieldData.type,
                    title: mockInputFieldData.title,
                    placeholder: mockInputFieldData.placeholder,
                    options: mockInputFieldData.options,
                });
            });
            it("WITH ERROR", async () => {
                await expect(InputField_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("UPDATE INPUTFIELD WITH API", () => {
            it("WITH SUCCESS 200", async () => {
                const mockInputFieldData = {
                    id: 11,
                    name: "name",
                    type: "text",
                    title: "Order ID",
                    placeholder: "Order ID",
                    options: [
                        {
                            value: "Asia",
                            text: "Asia",
                        },
                    ],
                };
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/input-field/" + createdInputFiled?._id)
                    .send(mockInputFieldData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdInputFiled._id.toString(),
                        id: mockInputFieldData.id,
                        name: mockInputFieldData.name,
                        type: mockInputFieldData.type,
                        title: mockInputFieldData.title,
                        placeholder: mockInputFieldData.placeholder,
                        options: mockInputFieldData.options,
                    });
                });
            });
            it("WITH ERROR 400", async () => {
                const mockInputFieldData = {
                    id: 11,
                    name: "name",
                    type: "text",
                    title: "Order ID",
                    placeholder: "Order ID",
                    options: [
                        {
                            value: "Asia",
                            text: "Asia",
                        },
                    ],
                };
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/input-field/" + mockIdString)
                    .send(mockInputFieldData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(404)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("UPDATE INPUTFIELD", () => {
            it("WITH SUCCESS", async () => {
                const mockInputFieldData = {
                    id: 12,
                    name: "Mobile",
                    type: "text",
                    title: "Order ID",
                    placeholder: "Order ID",
                    options: [
                        {
                            value: "Asia",
                            text: "Asia",
                        },
                    ],
                };
                const updatedInputFiled = await InputField_service_1.default.updateInputField(createdInputFiled._id.toString(), mockInputFieldData);
                expect(updatedInputFiled).toMatchObject({
                    _id: createdInputFiled._id,
                    id: mockInputFieldData.id,
                    name: mockInputFieldData.name,
                    type: mockInputFieldData.type,
                    title: mockInputFieldData.title,
                    placeholder: mockInputFieldData.placeholder,
                    options: mockInputFieldData.options,
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(InputField_service_1.default.updateInputField(mockIdString, {})).rejects.toThrow();
            });
        });
        describe("DELETE INPUTFIELD", () => {
            it("WITH SUCCESS", async () => {
                const DeletedInputField = await InputField_service_1.default.deleteInputField(createdInputFiled._id.toString());
                expect(DeletedInputField).toMatchObject({
                    _id: createdInputFiled._id,
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(InputField_service_1.default.deleteInputField(mockIdString)).rejects.toThrow();
            });
        });
    });
});
