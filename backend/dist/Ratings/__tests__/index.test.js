"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Ratings_repo_1 = __importDefault(require("../Ratings.repo"));
const Ratings_service_1 = __importDefault(require("../Ratings.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
let createdRatings = null;
describe("Ratings Service", () => {
    describe("Ratings Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRatings = null;
        });
        describe("Create Ratings", () => {
            it("WITH SUCCESS", async () => {
                createdRatings = await Ratings_repo_1.default.create({ ratings: [] });
                expect(createdRatings).not.toBeNull();
                expect(createdRatings._id).not.toBeNull();
                expect(createdRatings.average).toBe(0);
                expect(createdRatings.ratings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("Get Ratings", () => {
            it("WITH SUCCESS", async () => {
                const ratings = await Ratings_repo_1.default.getByID(createdRatings._id.toString());
                expect(ratings).toMatchObject({
                    _id: createdRatings?._id,
                    average: createdRatings?.average,
                });
                expect(ratings.ratings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Ratings", () => {
            it("WITH SUCCESS", async () => {
                const ratingId = new mongoose_1.default.Types.ObjectId();
                const updatedRatings = await Ratings_repo_1.default.update(createdRatings._id.toString(), { ratings: [ratingId] });
                expect(updatedRatings._id.toString()).toBe(createdRatings?._id.toString());
                expect(updatedRatings.ratings.length).toBe(1);
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Ratings", () => {
            it("WITH SUCCESS", async () => {
                const deletedRatings = await Ratings_repo_1.default.delete(createdRatings._id.toString());
                expect(deletedRatings._id.toString()).toBe(createdRatings?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Ratings Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRatings = null;
        });
        describe("Create Ratings", () => {
            it("WITH SUCCESS", async () => {
                createdRatings = await Ratings_service_1.default.createRatings({ ratings: [] });
                expect(createdRatings).not.toBeNull();
                expect(createdRatings._id).not.toBeNull();
                expect(createdRatings.average).toBe(0);
                expect(createdRatings.ratings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_service_1.default.createRatings({})).rejects.toThrow();
            });
        });
        describe("Get Ratings", () => {
            it("WITH SUCCESS", async () => {
                const ratings = await Ratings_service_1.default.getRating(createdRatings._id.toString());
                expect(ratings._id.toString()).toBe(createdRatings?._id.toString());
                expect(ratings.average).toBe(0);
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_service_1.default.getRating("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Calculate Average Rating", () => {
            it("WITH SUCCESS", async () => {
                const average = await Ratings_service_1.default.calculateAverageRating(createdRatings._id.toString());
                expect(average).toBe(0);
            });
            it("WITH ERROR - non-existent ID", async () => {
                await expect(Ratings_service_1.default.calculateAverageRating("507f1f77bcf86cd799439011")).rejects.toThrow();
            });
        });
        describe("Update Ratings", () => {
            it("WITH SUCCESS", async () => {
                const ratingId = new mongoose_1.default.Types.ObjectId();
                const updatedRatings = await Ratings_service_1.default.updateRatings(createdRatings._id.toString(), { ratings: [ratingId] });
                expect(updatedRatings._id.toString()).toBe(createdRatings?._id.toString());
                expect(updatedRatings.ratings.length).toBe(1);
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_service_1.default.updateRatings("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Ratings", () => {
            it("WITH SUCCESS", async () => {
                const deletedRatings = await Ratings_service_1.default.deleteRatings(createdRatings._id.toString());
                expect(deletedRatings._id.toString()).toBe(createdRatings?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Ratings_service_1.default.deleteRatings("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Ratings API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRatings = null;
        });
        describe("GET /ratings/:id", () => {
            beforeAll(async () => {
                createdRatings = await Ratings_service_1.default.createRatings({ ratings: [] });
            });
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/ratings/" + createdRatings._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdRatings?._id.toString());
                    expect(response.body.data.average).toBe(0);
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/ratings/msfkmsdfsf")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(500)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
    });
});
