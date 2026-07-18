"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Game_repo_1 = __importDefault(require("../Game.repo"));
const Game_service_1 = __importDefault(require("../Game.service"));
const Form_service_1 = __importDefault(require("../utils/Form.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
let createdGame = null;
const mockGameData = {
    id: 10,
    name: "Mobile Legend",
    icon: "",
    background: "",
    play_store: "",
    app_store: "",
    about: "",
};
describe("Game Service", () => {
    describe("Game Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdGame = null;
        });
        describe("CREATE GAME", () => {
            it("WITH SUCEESS", async () => {
                createdGame = await Game_repo_1.default.create(mockGameData);
                expect(createdGame).not.toBeNull();
                expect(createdGame._id).not.toBeNull();
                expect(createdGame).toMatchObject({
                    id: mockGameData.id,
                    name: mockGameData.name,
                    icon: mockGameData.icon,
                    background: mockGameData.background,
                    play_store: mockGameData.play_store,
                    app_store: mockGameData.app_store,
                    about: mockGameData.about,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Game_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("GET GAMES", () => {
            it("WITH SUCEESS", async () => {
                const games = await Game_repo_1.default.get({});
                expect(Array.isArray(games)).toBe(true);
                expect(games.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("GET GAME", () => {
            it("WITH SUCEESS", async () => {
                const game = await Game_repo_1.default.getByID(createdGame._id.toString());
                expect(game).toMatchObject({
                    _id: createdGame?._id,
                    id: mockGameData.id,
                    name: mockGameData.name,
                    icon: mockGameData.icon,
                    background: mockGameData.background,
                    play_store: mockGameData.play_store,
                    app_store: mockGameData.app_store,
                    about: mockGameData.about,
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Game_repo_1.default.getByID(mock_id)).rejects.toThrow();
            });
        });
        describe("UPDATE GAME", () => {
            it("WITH SUCEESS", async () => {
                const mockGameData = {
                    id: 11,
                    name: "PUBG MOBILE",
                    icon: "",
                    background: "",
                    play_store: "",
                    app_store: "",
                    about: "",
                };
                const game = await Game_repo_1.default.update(createdGame._id.toString(), mockGameData);
                expect(game).toMatchObject({
                    _id: createdGame?._id,
                    id: mockGameData.id,
                    name: mockGameData.name,
                    icon: mockGameData.icon,
                    background: mockGameData.background,
                    play_store: mockGameData.play_store,
                    app_store: mockGameData.app_store,
                    about: mockGameData.about,
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Game_repo_1.default.update(mock_id, {})).rejects.toThrow();
            });
        });
        describe("DELETE GAME", () => {
            it("WITH SUCEESS", async () => {
                const game = await Game_repo_1.default.delete(createdGame._id.toString());
                expect(game).toMatchObject({
                    _id: createdGame?._id,
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Game_repo_1.default.delete(mock_id)).rejects.toThrow();
            });
        });
    });
    describe("Game SERVICE", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdGame = null;
        });
        describe("CREATE GAME", () => {
            it("WITH SUCEESS", async () => {
                createdGame = await Game_service_1.default.createGame(mockGameData);
                expect(createdGame).not.toBeNull();
                expect(createdGame._id).not.toBeNull();
                expect(createdGame).toMatchObject({
                    id: mockGameData.id,
                    name: mockGameData.name,
                    icon: mockGameData.icon,
                    background: mockGameData.background,
                    play_store: mockGameData.play_store,
                    app_store: mockGameData.app_store,
                    about: mockGameData.about,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Game_service_1.default.createGame({})).rejects.toThrow();
            });
        });
        describe("GET GAME", () => {
            it("WITH SUCEESS", async () => {
                const game = await Game_service_1.default.getGame(createdGame._id.toString());
                expect(game).toMatchObject({
                    _id: createdGame?._id,
                    id: mockGameData.id,
                    name: mockGameData.name,
                    icon: mockGameData.icon,
                    background: mockGameData.background,
                    play_store: mockGameData.play_store,
                    app_store: mockGameData.app_store,
                    about: mockGameData.about,
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Game_service_1.default.getGame(mock_id)).rejects.toThrow();
            });
        });
        describe("GET GAMES", () => {
            it("WITH SUCEESS", async () => {
                const games = await Game_service_1.default.getGames({});
                expect(Array.isArray(games)).toBe(true);
                expect(games.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("UPDATE GAME", () => {
            it("WITH SUCEESS", async () => {
                const mockGameData = {
                    id: 11,
                    name: "PUBG MOBILE",
                    icon: "",
                    background: "",
                    play_store: "",
                    app_store: "",
                    about: "",
                };
                const game = await Game_service_1.default.updateGame(createdGame._id.toString(), mockGameData);
                expect(game).toMatchObject({
                    _id: createdGame?._id,
                    id: mockGameData.id,
                    name: mockGameData.name,
                    icon: mockGameData.icon,
                    background: mockGameData.background,
                    play_store: mockGameData.play_store,
                    app_store: mockGameData.app_store,
                    about: mockGameData.about,
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Game_service_1.default.updateGame(mock_id, {})).rejects.toThrow();
            });
            describe("ADD FORM", () => {
                it("WITH SUCEESS", async () => {
                    const mockInputFieldData = [
                        {
                            id: 116,
                            name: "id",
                            type: "number",
                            title: "User ID",
                            placeholder: "User ID",
                            options: [],
                        },
                    ];
                    const game = await Game_service_1.default.addForm(createdGame._id.toString(), mockInputFieldData);
                    const form = await Form_service_1.default.getForm(game.form.toString());
                    expect(form).toMatchObject({
                        _id: game.form,
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
                    await expect(Game_service_1.default.addForm(mock_id, [])).rejects.toThrow();
                });
            });
        });
        describe("DELETE GAME", () => {
            it("WITH SUCEESS", async () => {
                const game = await Game_service_1.default.deleteGame(createdGame._id.toString());
                expect(game).toMatchObject({
                    _id: createdGame?._id,
                });
            });
            it("WITH ERROR", async () => {
                const mock_id = new mongoose_1.default.Types.ObjectId().toString();
                await expect(Game_repo_1.default.delete(mock_id)).rejects.toThrow();
            });
        });
    });
    describe("GAME API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdGame = null;
        });
        describe("POST /game", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/game")
                    .send(mockGameData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    createdGame = response.body.data;
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        id: mockGameData.id,
                        name: mockGameData.name,
                        icon: mockGameData.icon,
                        background: mockGameData.background,
                        play_store: mockGameData.play_store,
                        app_store: mockGameData.app_store,
                        about: mockGameData.about,
                    });
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/game")
                    .send({})
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(400)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("GET /game/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/game/" + createdGame?._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        id: mockGameData.id,
                        name: mockGameData.name,
                        icon: mockGameData.icon,
                        background: mockGameData.background,
                        play_store: mockGameData.play_store,
                        app_store: mockGameData.app_store,
                        about: mockGameData.about,
                    });
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/game/msfkmsdfsf")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(500)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("GET /games", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/games")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(Array.isArray(response.body.data)).toBe(true);
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
            });
        });
        describe("PUT /game/:id", () => {
            it("Status 200 Success", async () => {
                const mockGameData = {
                    id: 11,
                    name: "PUBG MOBILE",
                    icon: "",
                    background: "",
                    play_store: "",
                    app_store: "",
                    about: "",
                };
                await (0, supertest_1.default)(index_1.express.app)
                    .put("/game/" + createdGame?._id)
                    .send(mockGameData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdGame?._id,
                        id: mockGameData.id,
                        name: mockGameData.name,
                        icon: mockGameData.icon,
                        background: mockGameData.background,
                        play_store: mockGameData.play_store,
                        app_store: mockGameData.app_store,
                        about: mockGameData.about,
                    });
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .put("/game/" + createdGame?._id)
                    .send({})
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(400)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("PATCH /game/addform/:id", () => {
            it("Status 200 Success", async () => {
                const mockInputFieldData = [
                    {
                        id: 116,
                        name: "id",
                        type: "number",
                        title: "User ID",
                        placeholder: "User ID",
                        options: [],
                    },
                ];
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/game/addform/" + createdGame?._id)
                    .send(mockInputFieldData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdGame?._id,
                        form: expect.any(String),
                    });
                });
            });
            it("Status 404 Error", async () => {
                const mockId = new mongoose_1.default.Types.ObjectId().toString();
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/game/addform/" + mockId)
                    .send([])
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(404)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("DELETE /game/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/game/" + createdGame?._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdGame?._id,
                    });
                });
            });
            it("Status 404 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/game/" + createdGame?._id)
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
