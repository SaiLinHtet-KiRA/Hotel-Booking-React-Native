"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Bookings_repo_1 = __importDefault(require("../Bookings.repo"));
const Bookings_service_1 = __importDefault(require("../Bookings.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
let createdBookings = null;
describe("Bookings Service", () => {
    describe("Bookings Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdBookings = null;
        });
        describe("Create Bookings", () => {
            it("WITH SUCCESS", async () => {
                createdBookings = await Bookings_repo_1.default.create({ bookings: [] });
                expect(createdBookings).not.toBeNull();
                expect(createdBookings._id).not.toBeNull();
                expect(createdBookings.bookings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("Get Bookings", () => {
            it("WITH SUCCESS", async () => {
                const bookings = await Bookings_repo_1.default.getByID(createdBookings._id.toString());
                expect(bookings).toMatchObject({
                    _id: createdBookings?._id,
                });
                expect(bookings.bookings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Bookings", () => {
            it("WITH SUCCESS", async () => {
                const bookingId = new mongoose_1.default.Types.ObjectId();
                const updatedBookings = await Bookings_repo_1.default.update(createdBookings._id.toString(), { bookings: [bookingId] });
                expect(updatedBookings._id.toString()).toBe(createdBookings?._id.toString());
                expect(updatedBookings.bookings.length).toBe(1);
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Bookings", () => {
            it("WITH SUCCESS", async () => {
                const deletedBookings = await Bookings_repo_1.default.delete(createdBookings._id.toString());
                expect(deletedBookings._id.toString()).toBe(createdBookings?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Bookings Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdBookings = null;
        });
        describe("Create Bookings", () => {
            it("WITH SUCCESS", async () => {
                createdBookings = await Bookings_service_1.default.createBookings({ bookings: [] });
                expect(createdBookings).not.toBeNull();
                expect(createdBookings._id).not.toBeNull();
                expect(createdBookings.bookings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_service_1.default.createBookings({})).rejects.toThrow();
            });
        });
        describe("Get Bookings", () => {
            it("WITH SUCCESS", async () => {
                const bookings = await Bookings_service_1.default.getBooking(createdBookings._id.toString());
                expect(bookings._id.toString()).toBe(createdBookings?._id.toString());
                expect(bookings.bookings).toEqual([]);
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_service_1.default.getBooking("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Bookings", () => {
            it("WITH SUCCESS", async () => {
                const bookingId = new mongoose_1.default.Types.ObjectId();
                const updatedBookings = await Bookings_service_1.default.updateBookings(createdBookings._id.toString(), { bookings: [bookingId] });
                expect(updatedBookings._id.toString()).toBe(createdBookings?._id.toString());
                expect(updatedBookings.bookings.length).toBe(1);
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_service_1.default.updateBookings("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Bookings", () => {
            it("WITH SUCCESS", async () => {
                const deletedBookings = await Bookings_service_1.default.deleteBookings(createdBookings._id.toString());
                expect(deletedBookings._id.toString()).toBe(createdBookings?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Bookings_service_1.default.deleteBookings("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Bookings API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdBookings = null;
        });
        describe("GET /bookings/:id", () => {
            beforeAll(async () => {
                createdBookings = await Bookings_service_1.default.createBookings({ bookings: [] });
            });
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/bookings/" + createdBookings._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdBookings?._id.toString());
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/bookings/msfkmsdfsf")
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
