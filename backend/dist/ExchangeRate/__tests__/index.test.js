"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Rate_repo_1 = __importDefault(require("../Rate.repo"));
const Rate_service_1 = __importDefault(require("../Rate.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mockRateData = {
    value: 33,
    currency: "THB",
    profit: 80,
};
let createdRate = null;
describe("Exchange Rate Service", () => {
    describe("Exchange Rate Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRate = null;
        });
        describe("Create Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                createdRate = await Rate_repo_1.default.create(mockRateData);
                expect(createdRate).not.toBeNull();
                expect(createdRate._id).not.toBeNull();
                expect(createdRate).toMatchObject({
                    value: mockRateData.value,
                    currency: mockRateData.currency,
                    profit: mockRateData.profit,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("Get Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                const Rate = await Rate_repo_1.default.getByID(createdRate._id.toString());
                expect(Rate).toMatchObject({
                    _id: createdRate?._id,
                    value: createdRate?.value,
                    currency: createdRate?.currency,
                    profit: createdRate?.profit,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                const mockRateData = {
                    value: 34,
                    currency: "MMK",
                    profit: 20,
                };
                const updatedExchageRate = await Rate_repo_1.default.update(createdRate._id.toString(), mockRateData);
                expect(updatedExchageRate).toMatchObject({
                    _id: createdRate?._id,
                    value: mockRateData.value,
                    currency: mockRateData.currency,
                    profit: mockRateData.profit,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                const deletedExchageRate = await Rate_repo_1.default.delete(createdRate._id.toString());
                expect(deletedExchageRate).toMatchObject({
                    _id: createdRate?._id,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Exchange Rate Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRate = null;
        });
        describe("Create Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                createdRate = await Rate_service_1.default.createRate(mockRateData);
                expect(createdRate).not.toBeNull();
                expect(createdRate._id).not.toBeNull();
                expect(createdRate).toMatchObject({
                    value: mockRateData.value,
                    currency: mockRateData.currency,
                    profit: mockRateData.profit,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_service_1.default.createRate({})).rejects.toThrow();
            });
        });
        describe("Get Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                const Rate = await Rate_service_1.default.getRate(createdRate._id.toString());
                expect(Rate).toMatchObject({
                    _id: createdRate?._id,
                    value: createdRate?.value,
                    currency: createdRate?.currency,
                    profit: createdRate?.profit,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_service_1.default.getRate("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                const mockRateData = {
                    value: 34,
                    currency: "MMK",
                    profit: 20,
                };
                const updatedExchageRate = await Rate_service_1.default.updateRate(createdRate._id.toString(), mockRateData);
                expect(updatedExchageRate).toMatchObject({
                    _id: createdRate?._id,
                    value: mockRateData.value,
                    currency: mockRateData.currency,
                    profit: mockRateData.profit,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_service_1.default.updateRate("dadcrfdsdfs", {})).rejects.toThrow();
            });
            it("WITH ERROR BEACUSE OF PROFITE IS GREATER THAN 100", async () => {
                const mockRateData = {
                    value: 34,
                    currency: "MMK",
                    profit: 110,
                };
                await expect(Rate_service_1.default.updateRate(createdRate._id.toString(), mockRateData)).rejects.toThrow();
            });
        });
        describe("Delete Exchange Rate", () => {
            it("WITH SUCCESS", async () => {
                const deletedExchageRate = await Rate_service_1.default.deleteRate(createdRate._id.toString());
                expect(deletedExchageRate).toMatchObject({
                    _id: createdRate?._id,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rate_service_1.default.deleteRate("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Exchange Rate API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRate = null;
        });
        describe("POST /rate", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/rate")
                    .send(mockRateData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    createdRate = response.body.data;
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        value: mockRateData.value,
                        currency: mockRateData.currency,
                        profit: mockRateData.profit,
                    });
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/rate")
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
        describe("GET /rate", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/rate/" + createdRate?._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdRate?._id,
                        value: createdRate?.value,
                        currency: createdRate?.currency,
                        profit: createdRate?.profit,
                    });
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/rate/msfkmsdfsf")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(500)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("PATCH /rate/:id", () => {
            it("Status 200 Success", async () => {
                const mockRateData = {
                    value: 34,
                    currency: "MMK",
                    profit: 20,
                };
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/rate/" + createdRate?._id)
                    .send(mockRateData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdRate?._id,
                        value: mockRateData.value,
                        currency: mockRateData.currency,
                        profit: mockRateData.profit,
                    });
                });
            });
            it("Status 400 Error BECAUSE OF GREATER THAN 100", async () => {
                const mockRateData = {
                    value: 34,
                    currency: "MMK",
                    profit: 101,
                };
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/rate/" + createdRate?._id)
                    .send(mockRateData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(400)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/rate/" + createdRate?._id)
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
        describe("DELETE /rate/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/rate/" + createdRate?._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdRate?._id,
                    });
                });
            });
            it("Status 404 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/rate/" + createdRate?._id)
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
