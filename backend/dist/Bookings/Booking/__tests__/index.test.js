"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../../util/mongoDBConfigTest");
const Booking_repo_1 = __importDefault(require("../Booking.repo"));
const Booking_service_1 = __importDefault(require("../Booking.service"));
const index_1 = require("../../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mockBookingData = {
    user: new mongoose_1.default.Types.ObjectId(),
    room: new mongoose_1.default.Types.ObjectId(),
    bookings: new mongoose_1.default.Types.ObjectId(),
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    status: "pending",
};
let createdBooking = null;
describe("Booking Service", () => {
    describe("Booking Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdBooking = null;
        });
        describe("Create Booking", () => {
            it("WITH SUCCESS", async () => {
                createdBooking = await Booking_repo_1.default.create(mockBookingData);
                expect(createdBooking).not.toBeNull();
                expect(createdBooking._id).not.toBeNull();
                expect(createdBooking.user.toString()).toBe(mockBookingData.user.toString());
                expect(createdBooking.room.toString()).toBe(mockBookingData.room.toString());
                expect(createdBooking.startDate).toBeInstanceOf(Date);
                expect(createdBooking.endDate).toBeInstanceOf(Date);
            });
            it("WITH ERROR", async () => {
                await expect(Booking_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("Get Booking", () => {
            it("WITH SUCCESS", async () => {
                const booking = await Booking_repo_1.default.getByID(createdBooking._id.toString());
                expect(booking._id.toString()).toBe(createdBooking?._id.toString());
                expect(booking.user.toString()).toBe(createdBooking?.user.toString());
                expect(booking.room.toString()).toBe(createdBooking?.room.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Booking_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Booking", () => {
            it("WITH SUCCESS", async () => {
                const newStartDate = new Date(Date.now() + 1000000);
                const newEndDate = new Date(Date.now() + 96400000);
                const updatedBooking = await Booking_repo_1.default.update(createdBooking._id.toString(), {
                    startDate: newStartDate,
                    endDate: newEndDate,
                });
                expect(updatedBooking._id.toString()).toBe(createdBooking?._id.toString());
                expect(updatedBooking.startDate).toBeInstanceOf(Date);
                expect(updatedBooking.endDate).toBeInstanceOf(Date);
            });
            it("WITH ERROR", async () => {
                await expect(Booking_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Booking", () => {
            it("WITH SUCCESS", async () => {
                const deletedBooking = await Booking_repo_1.default.delete(createdBooking._id.toString());
                expect(deletedBooking._id.toString()).toBe(createdBooking?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Booking_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Booking Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdBooking = null;
        });
        describe("Create Booking", () => {
            it("WITH SUCCESS", async () => {
                createdBooking = await Booking_service_1.default.createBooking(mockBookingData);
                expect(createdBooking).not.toBeNull();
                expect(createdBooking._id).not.toBeNull();
                expect(createdBooking.user.toString()).toBe(mockBookingData.user.toString());
                expect(createdBooking.startDate).toBeInstanceOf(Date);
            });
            it("WITH ERROR", async () => {
                await expect(Booking_service_1.default.createBooking({})).rejects.toThrow();
            });
            it("WITH ERROR - endDate before startDate", async () => {
                const invalidData = {
                    user: new mongoose_1.default.Types.ObjectId(),
                    room: new mongoose_1.default.Types.ObjectId(),
                    bookings: new mongoose_1.default.Types.ObjectId(),
                    startDate: new Date(Date.now() + 86400000),
                    endDate: new Date(),
                    status: "pending",
                };
                await expect(Booking_service_1.default.createBooking(invalidData)).rejects.toThrow();
            });
        });
        describe("Get Booking", () => {
            it("WITH SUCCESS", async () => {
                const booking = await Booking_service_1.default.getBooking(createdBooking._id.toString());
                expect(booking._id.toString()).toBe(createdBooking?._id.toString());
                expect(booking.user.toString()).toBe(createdBooking?.user.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Booking_service_1.default.getBooking("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("Update Booking", () => {
            it("WITH SUCCESS", async () => {
                const newStartDate = new Date(Date.now() + 2000000);
                const newEndDate = new Date(Date.now() + 106400000);
                const updatedBooking = await Booking_service_1.default.updateBooking(createdBooking._id.toString(), {
                    startDate: newStartDate,
                    endDate: newEndDate,
                });
                expect(updatedBooking._id.toString()).toBe(createdBooking?._id.toString());
                expect(updatedBooking.startDate).toBeInstanceOf(Date);
            });
            it("WITH ERROR", async () => {
                await expect(Booking_service_1.default.updateBooking("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Booking", () => {
            it("WITH SUCCESS", async () => {
                const deletedBooking = await Booking_service_1.default.deleteBooking(createdBooking._id.toString());
                expect(deletedBooking._id.toString()).toBe(createdBooking?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Booking_service_1.default.deleteBooking("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Booking API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdBooking = null;
        });
        describe("POST /booking", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/booking")
                    .send({
                    user: mockBookingData.user.toString(),
                    room: mockBookingData.room.toString(),
                    bookings: mockBookingData.bookings.toString(),
                    startDate: mockBookingData.startDate.toISOString(),
                    endDate: mockBookingData.endDate.toISOString(),
                })
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    createdBooking = response.body.data;
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data.user).toBe(mockBookingData.user.toString());
                    expect(response.body.data.room).toBe(mockBookingData.room.toString());
                    expect(response.body.data.startDate).toBeDefined();
                    expect(response.body.data.endDate).toBeDefined();
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/booking")
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
        describe("GET /booking/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/booking/" + createdBooking._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdBooking?._id.toString());
                    expect(response.body.data.user).toBe(createdBooking?.user.toString());
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/booking/msfkmsdfsf")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(500)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("DELETE /booking/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/booking/" + createdBooking._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdBooking?._id.toString());
                });
            });
            it("Status 404 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/booking/" + createdBooking._id)
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
