"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Room_repo_1 = __importDefault(require("../Room.repo"));
const Room_service_1 = __importDefault(require("../Room.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mockRoomData = {
    number: 101,
    type: "single bed",
    photo: [],
    capacity: 2,
    price: 100,
    status: "available",
};
let createdRoom = null;
describe("Room Booking Service", () => {
    describe("Room Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRoom = null;
        });
        describe("Create Room", () => {
            it("WITH SUCCESS", async () => {
                createdRoom = await Room_repo_1.default.create(mockRoomData);
                expect(createdRoom).not.toBeNull();
                expect(createdRoom._id).not.toBeNull();
                expect(createdRoom.number).toBe(mockRoomData.number);
                expect(createdRoom.type).toBe(mockRoomData.type);
                expect(createdRoom.capacity).toBe(mockRoomData.capacity);
                expect(createdRoom.price).toBe(mockRoomData.price);
                expect(createdRoom.status).toBe(mockRoomData.status);
            });
            it("WITH ERROR", async () => {
                await expect(Room_repo_1.default.create({})).rejects.toThrow();
            });
            it("WITH ERROR - duplicate room number", async () => {
                await expect(Room_repo_1.default.create(mockRoomData)).rejects.toThrow();
            });
        });
        describe("Get Room", () => {
            it("WITH SUCCESS", async () => {
                const room = await Room_repo_1.default.getByID(createdRoom._id.toString());
                expect(room._id.toString()).toBe(createdRoom?._id.toString());
                expect(room.number).toBe(createdRoom?.number);
                expect(room.type).toBe(createdRoom?.type);
            });
            it("WITH ERROR", async () => {
                await expect(Room_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("List Rooms", () => {
            it("WITH SUCCESS", async () => {
                const rooms = await Room_repo_1.default.get({});
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH PAGINATION", async () => {
                const rooms = await Room_repo_1.default.get({ page: 0, limit: 10 });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH TYPE FILTER", async () => {
                const rooms = await Room_repo_1.default.get({ type: "single bed" });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITHOUT FILTERS", async () => {
                const rooms = await Room_repo_1.default.get({});
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH STATUS FILTER", async () => {
                const rooms = await Room_repo_1.default.get({ status: "available" });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("Update Room", () => {
            it("WITH SUCCESS", async () => {
                const updatedRoom = await Room_repo_1.default.update(createdRoom._id.toString(), {
                    number: 202,
                    type: "deluxe",
                    capacity: 4,
                    price: 300,
                    status: "maintenance",
                });
                expect(updatedRoom._id.toString()).toBe(createdRoom?._id.toString());
                expect(updatedRoom.number).toBe(202);
                expect(updatedRoom.type).toBe("deluxe");
                expect(updatedRoom.status).toBe("maintenance");
            });
            it("WITH ERROR", async () => {
                await expect(Room_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete Room", () => {
            it("WITH SUCCESS", async () => {
                const deletedRoom = await Room_repo_1.default.delete(createdRoom._id.toString());
                expect(deletedRoom._id.toString()).toBe(createdRoom?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Room_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Room Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRoom = null;
        });
        describe("Create Room", () => {
            it("WITH SUCCESS", async () => {
                createdRoom = await Room_service_1.default.createRoom(mockRoomData);
                expect(createdRoom).not.toBeNull();
                expect(createdRoom._id).not.toBeNull();
                expect(createdRoom.number).toBe(mockRoomData.number);
                expect(createdRoom.type).toBe(mockRoomData.type);
                expect(createdRoom.status).toBe(mockRoomData.status);
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.createRoom({})).rejects.toThrow();
            });
            it("WITH ERROR - duplicate room number", async () => {
                await expect(Room_service_1.default.createRoom(mockRoomData)).rejects.toThrow();
            });
        });
        describe("Get Room", () => {
            it("WITH SUCCESS", async () => {
                const room = await Room_service_1.default.getRoom(createdRoom._id.toString());
                expect(room._id.toString()).toBe(createdRoom?._id.toString());
                expect(room.number).toBe(createdRoom?.number);
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.getRoom("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("List Rooms", () => {
            it("WITH SUCCESS", async () => {
                const { data: rooms } = await Room_service_1.default.getRooms({});
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH PAGINATION", async () => {
                const { data: rooms } = await Room_service_1.default.getRooms({ page: 0, limit: 10 });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH TYPE FILTER", async () => {
                const { data: rooms } = await Room_service_1.default.getRooms({ type: "single bed" });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITHOUT FILTERS", async () => {
                const { data: rooms } = await Room_service_1.default.getRooms({});
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH STATUS FILTER", async () => {
                const { data: rooms } = await Room_service_1.default.getRooms({ status: "available" });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("Update Room", () => {
            it("WITH SUCCESS", async () => {
                const updatedRoom = await Room_service_1.default.updateRoom(createdRoom._id.toString(), {
                    number: 303,
                    type: "suite",
                    capacity: 5,
                    price: 500,
                    status: "busy",
                });
                expect(updatedRoom._id.toString()).toBe(createdRoom?._id.toString());
                expect(updatedRoom.number).toBe(303);
                expect(updatedRoom.type).toBe("suite");
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.updateRoom("dadcrfdsdfs", {})).rejects.toThrow();
            });
            it("WITH ERROR BECAUSE OF INVALID TYPE", async () => {
                await expect(Room_service_1.default.updateRoom(createdRoom._id.toString(), {
                    number: 404,
                    type: "invalid-type",
                    capacity: 3,
                    price: 200,
                })).rejects.toThrow();
            });
        });
        describe("Delete Room", () => {
            it("WITH SUCCESS", async () => {
                const deletedRoom = await Room_service_1.default.deleteRoom(createdRoom._id.toString());
                expect(deletedRoom._id.toString()).toBe(createdRoom?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.deleteRoom("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("Room API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdRoom = null;
        });
        describe("POST /room", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/room")
                    .send(mockRoomData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    createdRoom = response.body.data;
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data.number).toBe(mockRoomData.number);
                    expect(response.body.data.type).toBe(mockRoomData.type);
                    expect(response.body.data.status).toBe(mockRoomData.status);
                });
            });
            it("Status 400 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .post("/room")
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
        describe("GET /room", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(Array.isArray(response.body.data)).toBe(true);
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
            });
            it("Status 200 with pagination", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room?page=0&limit=10")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(Array.isArray(response.body.data)).toBe(true);
                });
            });
            it("Status 200 with type filter", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room?type=single+bed")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(Array.isArray(response.body.data)).toBe(true);
                });
            });
        });
        describe("GET /room/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room/" + createdRoom._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdRoom?._id.toString());
                    expect(response.body.data.number).toBe(createdRoom?.number);
                });
            });
            it("Status 500 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room/msfkmsdfsf")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(500)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data).toBeNull();
                });
            });
        });
        describe("PATCH /room/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/room/" + createdRoom._id)
                    .send({
                    number: 505,
                    type: "family",
                    capacity: 4,
                    price: 400,
                    status: "busy",
                })
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdRoom?._id.toString());
                    expect(response.body.data.number).toBe(505);
                });
            });
            it("Status 400 Error BECAUSE OF INVALID TYPE", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/room/" + createdRoom._id)
                    .send({
                    number: 606,
                    type: "invalid-type",
                    capacity: 3,
                    price: 200,
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
                    .patch("/room/" + createdRoom._id)
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
        describe("DELETE /room/:id", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/room/" + createdRoom._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdRoom?._id.toString());
                });
            });
            it("Status 404 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/room/" + createdRoom._id)
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
