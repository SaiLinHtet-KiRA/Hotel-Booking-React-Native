"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Room_repo_1 = __importDefault(require("../Room.repo"));
const Room_service_1 = __importDefault(require("../Room.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const userId = new mongoose_1.default.Types.ObjectId().toString();
const startTime = new Date();
const endTime = new Date(Date.now() + 3600000);
const mockRoomData = {
    startTime,
    endTime,
    userId: userId,
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
                expect(createdRoom.startTime).toBeInstanceOf(Date);
                expect(createdRoom.endTime).toBeInstanceOf(Date);
                expect(createdRoom.userId.toString()).toBe(userId);
                expect(typeof createdRoom.id).toBe("number");
            });
            it("WITH ERROR", async () => {
                await expect(Room_repo_1.default.create({})).rejects.toThrow();
            });
        });
        describe("Get Room", () => {
            it("WITH SUCCESS", async () => {
                const room = await Room_repo_1.default.getByID(createdRoom._id.toString());
                expect(room._id.toString()).toBe(createdRoom?._id.toString());
                expect(room.startTime).toBeInstanceOf(Date);
                expect(room.endTime).toBeInstanceOf(Date);
                expect(room.userId.toString()).toBe(userId);
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
                expect(rooms[0].startTime).toBeInstanceOf(Date);
            });
            it("WITH PAGINATION", async () => {
                const rooms = await Room_repo_1.default.get({ page: 0, limit: 10 });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH TIME FILTER", async () => {
                const rooms = await Room_repo_1.default.get({ time: startTime.getTime() });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH SORT", async () => {
                const rooms = await Room_repo_1.default.get({ sort: "startTime" });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("Update Room", () => {
            it("WITH SUCCESS", async () => {
                const newStartTime = new Date(Date.now() + 1000000);
                const newEndTime = new Date(Date.now() + 8200000);
                const newUserId = new mongoose_1.default.Types.ObjectId().toString();
                const updatedRoom = await Room_repo_1.default.update(createdRoom._id.toString(), {
                    startTime: newStartTime,
                    endTime: newEndTime,
                    userId: newUserId,
                });
                expect(updatedRoom._id.toString()).toBe(createdRoom?._id.toString());
                expect(updatedRoom.userId.toString()).toBe(newUserId);
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
                expect(createdRoom.startTime).toBeInstanceOf(Date);
                expect(createdRoom.endTime).toBeInstanceOf(Date);
                expect(createdRoom.userId.toString()).toBe(userId);
                expect(typeof createdRoom.id).toBe("number");
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.createRoom({})).rejects.toThrow();
            });
        });
        describe("Get Room", () => {
            it("WITH SUCCESS", async () => {
                const room = await Room_service_1.default.getRoom(createdRoom._id.toString());
                expect(room._id.toString()).toBe(createdRoom?._id.toString());
                expect(room.userId.toString()).toBe(userId);
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.getRoom("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("List Rooms", () => {
            it("WITH SUCCESS", async () => {
                const rooms = await Room_service_1.default.getRooms({});
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH PAGINATION", async () => {
                const rooms = await Room_service_1.default.getRooms({ page: 0, limit: 10 });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH TIME FILTER", async () => {
                const rooms = await Room_service_1.default.getRooms({ time: startTime.getTime() });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH SORT", async () => {
                const rooms = await Room_service_1.default.getRooms({ sort: "startTime" });
                expect(Array.isArray(rooms)).toBe(true);
                expect(rooms.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("Update Room", () => {
            it("WITH SUCCESS", async () => {
                const newUserId = new mongoose_1.default.Types.ObjectId().toString();
                const updatedRoom = await Room_service_1.default.updateRoom(createdRoom._id.toString(), {
                    startTime: new Date(Date.now() + 2000000),
                    endTime: new Date(Date.now() + 9200000),
                    userId: newUserId,
                });
                expect(updatedRoom._id.toString()).toBe(createdRoom?._id.toString());
                expect(updatedRoom.userId.toString()).toBe(newUserId);
            });
            it("WITH ERROR", async () => {
                await expect(Room_service_1.default.updateRoom("dadcrfdsdfs", {})).rejects.toThrow();
            });
            it("WITH ERROR BECAUSE OF INVALID USER ID", async () => {
                await expect(Room_service_1.default.updateRoom(createdRoom._id.toString(), {
                    startTime: new Date(),
                    endTime: new Date(Date.now() + 7200000),
                    userId: "invalid-object-id",
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
                    .send({
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    userId,
                })
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    createdRoom = response.body.data;
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data.startTime).toBeDefined();
                    expect(response.body.data.endTime).toBeDefined();
                    expect(response.body.data.userId).toBe(userId);
                    expect(response.body.data.id).toBeGreaterThan(0);
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
            it("Status 200 with time filter", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room?time=" + startTime.getTime())
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(Array.isArray(response.body.data)).toBe(true);
                });
            });
            it("Status 200 with sort", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/room?sort=startTime")
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
                    expect(response.body.data.userId).toBe(userId);
                    expect(response.body.data.id).toBeGreaterThan(0);
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
                const newStartTime = new Date(Date.now() + 1000000);
                const newEndTime = new Date(Date.now() + 8200000);
                const newUserId = new mongoose_1.default.Types.ObjectId().toString();
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/room/" + createdRoom._id)
                    .send({
                    startTime: newStartTime.toISOString(),
                    endTime: newEndTime.toISOString(),
                    userId: newUserId,
                })
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdRoom?._id.toString());
                    expect(response.body.data.userId).toBe(newUserId);
                });
            });
            it("Status 400 Error BECAUSE OF INVALID USER ID", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/room/" + createdRoom._id)
                    .send({
                    startTime: new Date().toISOString(),
                    endTime: new Date().toISOString(),
                    userId: "invalid-id",
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
