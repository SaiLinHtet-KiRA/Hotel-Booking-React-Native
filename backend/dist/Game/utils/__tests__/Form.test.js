"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../../util/mongoDBConfigTest");
const Form_repo_1 = __importDefault(require("../Form.repo"));
const Form_service_1 = __importDefault(require("../Form.service"));
const InputField_service_1 = __importDefault(require("../InputField.service"));
const index_1 = require("../../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mockInputFieldData = {
    id: 110,
    name: "id",
    type: "number",
    title: "User ID",
    placeholder: "User ID",
    options: [],
};
let createdForm = null;
describe("Form Service", () => {
    describe("Form Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdForm = null;
        });
        describe("CREATE FORM", () => {
            it("WITH SUCCESS", async () => {
                createdForm = await Form_repo_1.default.create({});
                expect(createdForm).not.toBeNull();
                expect(createdForm._id).not.toBeNull();
                expect(createdForm).toMatchObject({
                    input_field: [],
                });
            });
        });
        describe("GET FORM", () => {
            it("WITH SUCCESS", async () => {
                const form = await Form_repo_1.default.getByID(createdForm._id.toString());
                expect(form).toMatchObject({
                    _id: createdForm._id,
                    input_field: [],
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Form_repo_1.default.getByID(mock_id)).rejects.toThrow();
            });
        });
        describe("UPDATE FORM", () => {
            it("WITH SUCCESS", async () => {
                const createdInputField = await InputField_service_1.default.createInputField(mockInputFieldData);
                const updatedForm = await Form_repo_1.default.update(createdForm._id.toString(), {
                    $push: { input_field: createdInputField._id.toString() },
                });
                expect(updatedForm).toMatchObject({
                    input_field: expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(mongoose_1.default.Types.ObjectId),
                            id: expect.any(Number),
                            name: expect.any(String),
                            type: expect.any(String),
                            title: expect.any(String),
                            placeholder: expect.any(String),
                            options: expect.arrayOf(expect.toString()),
                        }),
                    ]),
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Form_repo_1.default.update(mockIdString, {})).rejects.toThrow();
            });
        });
        describe("Delete FORM", () => {
            it("WITH SUCCESS", async () => {
                const deletedForm = await Form_repo_1.default.delete(createdForm._id.toString());
                expect(deletedForm).toMatchObject({
                    _id: createdForm._id,
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Form_repo_1.default.delete(mockIdString)).rejects.toThrow();
            });
        });
    });
    describe("Form SERVICE", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdForm = null;
        });
        describe("CREATE FORM", () => {
            it("WITH SUCCESS", async () => {
                createdForm = await Form_service_1.default.createForm([mockInputFieldData]);
                expect(createdForm).not.toBeNull();
                expect(createdForm._id).not.toBeNull();
                expect(createdForm).toMatchObject({
                    input_field: expect.arrayContaining([
                        expect.any(mongoose_1.default.Types.ObjectId),
                    ]),
                });
            });
        });
        describe("GET FORM", () => {
            it("WITH SUCCESS", async () => {
                const form = await Form_service_1.default.getForm(createdForm._id.toString());
                expect(form).toMatchObject({
                    _id: createdForm._id,
                    input_field: expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(mongoose_1.default.Types.ObjectId),
                            id: expect.any(Number),
                            name: expect.any(String),
                            type: expect.any(String),
                            title: expect.any(String),
                            placeholder: expect.any(String),
                            options: expect.arrayOf(expect.toString()),
                        }),
                    ]),
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Form_service_1.default.getForm(mock_id)).rejects.toThrow();
            });
        });
        describe("UPDATE FORM", () => {
            it("WITH SUCCESS", async () => {
                const createdInputField = await InputField_service_1.default.createInputField(mockInputFieldData);
                const updatedForm = await Form_service_1.default.updateForm(createdForm._id.toString(), {
                    $push: { input_field: createdInputField._id },
                });
                expect(updatedForm).toMatchObject({
                    _id: createdForm?._id,
                    input_field: expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(mongoose_1.default.Types.ObjectId),
                            id: expect.any(Number),
                            name: expect.any(String),
                            type: expect.any(String),
                            title: expect.any(String),
                            placeholder: expect.any(String),
                            options: expect.arrayOf(expect.toString()),
                        }),
                    ]),
                });
            });
            it("WITH ERROR", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Form_service_1.default.updateForm(mockIdString, {})).rejects.toThrow();
            });
            describe("ADD INPUTFIELD", () => {
                it("WITH SUCCESS", async () => {
                    const updatedForm = await Form_service_1.default.addInputField(createdForm._id.toString(), mockInputFieldData);
                    expect(updatedForm).toMatchObject({
                        _id: createdForm._id,
                        input_field: expect.arrayContaining([
                            expect.objectContaining({
                                _id: expect.any(mongoose_1.default.Types.ObjectId),
                                id: expect.any(Number),
                                name: expect.any(String),
                                type: expect.any(String),
                                title: expect.any(String),
                                placeholder: expect.any(String),
                                options: expect.arrayOf(expect.toString()),
                            }),
                        ]),
                    });
                });
                it("WITH ERROR", async () => {
                    const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                    await expect(Form_service_1.default.addInputField(mockIdString, {})).rejects.toThrow();
                });
            });
            describe("REMOVE INPUTFIELD", () => {
                it("WITH SUCCESS", async () => {
                    const existedForm = await Form_service_1.default.getForm(createdForm._id.toString());
                    const updatedForm = await Form_service_1.default.removeInputField(createdForm._id.toString(), existedForm.input_field[0]._id.toString());
                    expect(updatedForm).toMatchObject({
                        input_field: expect.arrayContaining([
                            expect.objectContaining({
                                _id: expect.any(mongoose_1.default.Types.ObjectId),
                                id: expect.any(Number),
                                name: expect.any(String),
                                type: expect.any(String),
                                title: expect.any(String),
                                placeholder: expect.any(String),
                                options: expect.arrayOf(expect.toString()),
                            }),
                        ]),
                    });
                });
                it("WITH ERROR", async () => {
                    const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                    const mockIdString2 = new mongoose_1.default.Types.ObjectId().toString();
                    await expect(Form_service_1.default.removeInputField(mockIdString, mockIdString2)).rejects.toThrow();
                });
            });
        });
    });
    describe("Form CONTROLLER", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdForm = null;
        });
        describe("GETFORM WITH API", () => {
            it("WITH SUCCESS 200", async () => {
                createdForm = await Form_service_1.default.createForm([mockInputFieldData]);
                await Form_service_1.default.addInputField(createdForm._id.toString(), mockInputFieldData);
                await (0, supertest_1.default)(index_1.express.app)
                    .get(`/form/${createdForm._id}`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        input_field: expect.arrayContaining([
                            expect.objectContaining({
                                _id: expect.any(String),
                                id: expect.any(Number),
                                name: expect.any(String),
                                type: expect.any(String),
                                title: expect.any(String),
                                placeholder: expect.any(String),
                                options: expect.arrayOf(expect.toString()),
                            }),
                        ]),
                    });
                });
            });
            it("WITH ERROR 404", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await (0, supertest_1.default)(index_1.express.app)
                    .get(`/form/${mockIdString}`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(404)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("REMOVEINPUTFIELD WITH API", () => {
            it("WITH SUCCESS 200", async () => {
                createdForm = await Form_service_1.default.createForm([mockInputFieldData]);
                await Form_service_1.default.addInputField(createdForm._id.toString(), mockInputFieldData);
                const existedForm = await Form_service_1.default.getForm(createdForm._id.toString());
                await (0, supertest_1.default)(index_1.express.app)
                    .delete(`/remove-input-field/${createdForm?.id}/${existedForm.input_field[0]._id.toString()}`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdForm._id.toString(),
                        input_field: expect.arrayContaining([
                            expect.objectContaining({
                                _id: expect.any(String),
                                id: expect.any(Number),
                                name: expect.any(String),
                                type: expect.any(String),
                                title: expect.any(String),
                                placeholder: expect.any(String),
                                options: expect.arrayOf(expect.toString()),
                            }),
                        ]),
                    });
                });
            });
            it("WITH ERROR 400", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await (0, supertest_1.default)(index_1.express.app)
                    .delete(`/remove-input-field/${createdForm?.id}/${mockIdString}`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(404)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("ADDINPUTFIELD WITH API", () => {
            it("WITH SUCCESS 200", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .patch(`/add-input-field/${createdForm?.id}`)
                    .send(mockInputFieldData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        input_field: expect.arrayContaining([
                            expect.objectContaining({
                                _id: expect.any(String),
                                id: expect.any(Number),
                                name: expect.any(String),
                                type: expect.any(String),
                                title: expect.any(String),
                                placeholder: expect.any(String),
                                options: expect.arrayOf(expect.toString()),
                            }),
                        ]),
                    });
                });
            });
            it("WITH ERROR 404", async () => {
                const mockIdString = new mongoose_1.default.Types.ObjectId().toString();
                await (0, supertest_1.default)(index_1.express.app)
                    .patch(`/add-input-field/${mockIdString}`)
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
    });
});
