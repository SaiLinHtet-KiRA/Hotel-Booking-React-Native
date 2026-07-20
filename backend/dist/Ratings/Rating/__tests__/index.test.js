"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../../util/mongoDBConfigTest");
const Rating_repo_1 = __importDefault(require("../Rating.repo"));
const Rating_service_1 = __importDefault(require("../Rating.service"));
const index_1 = require("../../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mockRatingData = {
    user: new mongoose_1.default.Types.ObjectId(),
    RatingsId: new mongoose_1.default.Types.ObjectId(),
    rating: 4,
    feed_back: "Great room!",
};
let createdRating = null;
describe("Rating Service", () => {
    describe("Rating Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRating = null;
        });
        describe("Create Rating", () => {
            it("WITH SUCCESS", async () => {
                createdRating = await Rating_repo_1.default.create(mockRatingData);
                expect(createdRating).not.toBeNull();
                expect(createdRating._id).not.toBeNull();
                expect(createdRating).toMatchObject({
                    user: mockRatingData.user,
                    RatingsId: mockRatingData.RatingsId,
                    rating: mockRatingData.rating,
                    feed_back: mockRatingData.feed_back,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("Get Rating", () => {
            it("WITH SUCCESS", async () => {
                const rating = await Rating_repo_1.default.getByID(createdRating._id.toString());
                expect(rating).toMatchObject({
                    _id: createdRating?._id,
                    user: createdRating?.user,
                    RatingsId: createdRating?.RatingsId,
                    rating: createdRating?.rating,
                    feed_back: createdRating?.feed_back,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Rating", () => {
            it("WITH SUCCESS", async () => {
                const updatedData = {
                    user: new mongoose_1.default.Types.ObjectId(),
                    RatingsId: mockRatingData.RatingsId,
                    rating: 5,
                    feed_back: "Excellent!",
                };
                const updatedRating = await Rating_repo_1.default.update(createdRating._id.toString(), updatedData);
                expect(updatedRating).toMatchObject({
                    _id: createdRating?._id,
                    rating: updatedData.rating,
                    feed_back: updatedData.feed_back,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Rating", () => {
            it("WITH SUCCESS", async () => {
                const deletedRating = await Rating_repo_1.default.delete(createdRating._id.toString());
                expect(deletedRating).toMatchObject({
                    _id: createdRating?._id,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Rating Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRating = null;
        });
        describe("Create Rating", () => {
            it("WITH SUCCESS", async () => {
                createdRating = await Rating_service_1.default.createRating(mockRatingData);
                expect(createdRating).not.toBeNull();
                expect(createdRating._id).not.toBeNull();
                expect(createdRating).toMatchObject({
                    user: mockRatingData.user,
                    RatingsId: mockRatingData.RatingsId,
                    rating: mockRatingData.rating,
                    feed_back: mockRatingData.feed_back,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_service_1.default.createRating({})).rejects.toThrow();
            });
        });
        describe("Get Rating", () => {
            it("WITH SUCCESS", async () => {
                const rating = await Rating_service_1.default.getRating(createdRating._id.toString());
                expect(rating).toMatchObject({
                    _id: createdRating?._id,
                    user: createdRating?.user,
                    RatingsId: createdRating?.RatingsId,
                    rating: createdRating?.rating,
                    feed_back: createdRating?.feed_back,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_service_1.default.getRating("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Rating", () => {
            it("WITH SUCCESS", async () => {
                const updatedData = {
                    user: new mongoose_1.default.Types.ObjectId(),
                    RatingsId: mockRatingData.RatingsId,
                    rating: 5,
                    feed_back: "Excellent!",
                };
                const updatedRating = await Rating_service_1.default.updateRating(createdRating._id.toString(), updatedData);
                expect(updatedRating).toMatchObject({
                    _id: createdRating?._id,
                    rating: updatedData.rating,
                    feed_back: updatedData.feed_back,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_service_1.default.updateRating("dadcrfdsdfs", {})).rejects.toThrow();
            });
            it("WITH ERROR BECAUSE OF RATING IS GREATER THAN 5", async () => {
                const invalidData = {
                    user: new mongoose_1.default.Types.ObjectId(),
                    RatingsId: new mongoose_1.default.Types.ObjectId(),
                    rating: 6,
                    feed_back: "Too high!",
                };
                await expect(Rating_service_1.default.updateRating(createdRating._id.toString(), invalidData)).rejects.toThrow();
            });
        });
        describe("Delete Rating", () => {
            it("WITH SUCCESS", async () => {
                const deletedRating = await Rating_service_1.default.deleteRating(createdRating._id.toString());
                expect(deletedRating).toMatchObject({
                    _id: createdRating?._id,
                });
            });
            it("WITH ERROR", async () => {
                await expect(Rating_service_1.default.deleteRating("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Rating API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRating = null;
        });
        describe("POST /rating", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/rating")
                    .send({
                    user: mockRatingData.user.toString(),
                    RatingsId: mockRatingData.RatingsId.toString(),
                    rating: mockRatingData.rating,
                    feed_back: mockRatingData.feed_back,
                })
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    createdRating = response.body.data;
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        rating: mockRatingData.rating,
                        feed_back: mockRatingData.feed_back,
                    });
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/rating")
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
        describe("GET /rating/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/rating/" + createdRating?._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdRating?._id.toString(),
                        rating: createdRating?.rating,
                        feed_back: createdRating?.feed_back,
                    });
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/rating/msfkmsdfsf")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(500)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("PATCH /rating/:id", () => {
            it("Status 200 Success", async () => {
                const updatedData = {
                    user: new mongoose_1.default.Types.ObjectId().toString(),
                    RatingsId: mockRatingData.RatingsId.toString(),
                    rating: 3,
                    feed_back: "Updated feedback",
                };
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/rating/" + createdRating?._id)
                    .send(updatedData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdRating?._id.toString(),
                        rating: updatedData.rating,
                        feed_back: updatedData.feed_back,
                    });
                });
            });
            it("Status 400 Error BECAUSE OF RATING GREATER THAN 5", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/rating/" + createdRating?._id)
                    .send({
                    user: new mongoose_1.default.Types.ObjectId().toString(),
                    RatingsId: mockRatingData.RatingsId.toString(),
                    rating: 6,
                    feed_back: "Too high",
                })
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
                    .patch("/rating/" + createdRating?._id)
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
        describe("DELETE /rating/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/rating/" + createdRating?._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toMatchObject({
                        _id: createdRating?._id.toString(),
                    });
                });
            });
            it("Status 404 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/rating/" + createdRating?._id)
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
