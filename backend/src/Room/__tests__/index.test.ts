import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { Room, RoomDocument } from "../Room.model";
import RoomRepo from "../Room.repo";
import RoomService from "../Room.service";
import { express } from "../../server/index";
import request from "supertest";

const userId = new mongoose.Types.ObjectId().toString();
const startTime = new Date();
const endTime = new Date(Date.now() + 3600000);

const mockRoomData: Room = {
  startTime,
  endTime,
  userId: userId as unknown as mongoose.Types.ObjectId,
};

let createdRoom: RoomDocument | null = null;

describe("Room Booking Service", () => {
  describe("Room Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRoom = null;
    });

    describe("Create Room", () => {
      it("WITH SUCCESS", async () => {
        createdRoom = await RoomRepo.create(mockRoomData);

        expect(createdRoom).not.toBeNull();
        expect(createdRoom._id).not.toBeNull();
        expect(createdRoom.startTime).toBeInstanceOf(Date);
        expect(createdRoom.endTime).toBeInstanceOf(Date);
        expect(createdRoom.userId.toString()).toBe(userId);
        expect(typeof createdRoom.id).toBe("number");
      });

      it("WITH ERROR", async () => {
        await expect(RoomRepo.create({} as Room)).rejects.toThrow();
      });
    });

    describe("Get Room", () => {
      it("WITH SUCCESS", async () => {
        const room = await RoomRepo.getByID(createdRoom!._id.toString());

        expect(room._id.toString()).toBe(createdRoom?._id.toString());
        expect(room.startTime).toBeInstanceOf(Date);
        expect(room.endTime).toBeInstanceOf(Date);
        expect(room.userId.toString()).toBe(userId);
      });

      it("WITH ERROR", async () => {
        await expect(RoomRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Rooms", () => {
      it("WITH SUCCESS", async () => {
        const rooms = await RoomRepo.get({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
        expect(rooms[0].startTime).toBeInstanceOf(Date);
      });

      it("WITH PAGINATION", async () => {
        const rooms = await RoomRepo.get({ page: 0, limit: 10 });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH TIME FILTER", async () => {
        const rooms = await RoomRepo.get({ time: startTime.getTime() });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITHOUT FILTERS", async () => {
        const rooms = await RoomRepo.get({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Room", () => {
      it("WITH SUCCESS", async () => {
        const newStartTime = new Date(Date.now() + 1000000);
        const newEndTime = new Date(Date.now() + 8200000);
        const newUserId = new mongoose.Types.ObjectId().toString();

        const updatedRoom = await RoomRepo.update(
          createdRoom!._id.toString(),
          {
            startTime: newStartTime,
            endTime: newEndTime,
            userId: newUserId as unknown as mongoose.Types.ObjectId,
          },
        );

        expect(updatedRoom._id.toString()).toBe(createdRoom?._id.toString());
        expect(updatedRoom.userId.toString()).toBe(newUserId);
      });

      it("WITH ERROR", async () => {
        await expect(
          RoomRepo.update("dadcrfdsdfs", {} as Room),
        ).rejects.toThrow();
      });
    });

    describe("Delete Room", () => {
      it("WITH SUCCESS", async () => {
        const deletedRoom = await RoomRepo.delete(
          createdRoom!._id.toString(),
        );

        expect(deletedRoom._id.toString()).toBe(createdRoom?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(RoomRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Room Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRoom = null;
    });

    describe("Create Room", () => {
      it("WITH SUCCESS", async () => {
        createdRoom = await RoomService.createRoom(mockRoomData);

        expect(createdRoom).not.toBeNull();
        expect(createdRoom._id).not.toBeNull();
        expect(createdRoom.startTime).toBeInstanceOf(Date);
        expect(createdRoom.endTime).toBeInstanceOf(Date);
        expect(createdRoom.userId.toString()).toBe(userId);
        expect(typeof createdRoom.id).toBe("number");
      });

      it("WITH ERROR", async () => {
        await expect(RoomService.createRoom({} as Room)).rejects.toThrow();
      });
    });

    describe("Get Room", () => {
      it("WITH SUCCESS", async () => {
        const room = await RoomService.getRoom(createdRoom!._id.toString());

        expect(room._id.toString()).toBe(createdRoom?._id.toString());
        expect(room.userId.toString()).toBe(userId);
      });

      it("WITH ERROR", async () => {
        await expect(RoomService.getRoom("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Rooms", () => {
      it("WITH SUCCESS", async () => {
        const rooms = await RoomService.getRooms({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH PAGINATION", async () => {
        const rooms = await RoomService.getRooms({ page: 0, limit: 10 });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH TIME FILTER", async () => {
        const rooms = await RoomService.getRooms({ time: startTime.getTime() });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITHOUT FILTERS", async () => {
        const rooms = await RoomService.getRooms({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Room", () => {
      it("WITH SUCCESS", async () => {
        const newUserId = new mongoose.Types.ObjectId().toString();

        const updatedRoom = await RoomService.updateRoom(
          createdRoom!._id.toString(),
          {
            startTime: new Date(Date.now() + 2000000),
            endTime: new Date(Date.now() + 9200000),
            userId: newUserId as unknown as mongoose.Types.ObjectId,
          },
        );

        expect(updatedRoom._id.toString()).toBe(createdRoom?._id.toString());
        expect(updatedRoom.userId.toString()).toBe(newUserId);
      });

      it("WITH ERROR", async () => {
        await expect(
          RoomService.updateRoom("dadcrfdsdfs", {} as Room),
        ).rejects.toThrow();
      });

      it("WITH ERROR BECAUSE OF INVALID USER ID", async () => {
        await expect(
          RoomService.updateRoom(createdRoom!._id.toString(), {
            startTime: new Date(),
            endTime: new Date(Date.now() + 7200000),
            userId: "invalid-object-id" as unknown as mongoose.Types.ObjectId,
          }),
        ).rejects.toThrow();
      });
    });

    describe("Delete Room", () => {
      it("WITH SUCCESS", async () => {
        const deletedRoom = await RoomService.deleteRoom(
          createdRoom!._id.toString(),
        );

        expect(deletedRoom._id.toString()).toBe(createdRoom?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(RoomService.deleteRoom("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Room API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRoom = null;
    });

    describe("POST /room", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
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
        await request(express.app)
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
        await request(express.app)
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
        await request(express.app)
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
        await request(express.app)
          .get("/room?time=" + startTime.getTime())
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
        await request(express.app)
          .get("/room/" + createdRoom!._id)
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
        await request(express.app)
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
        const newUserId = new mongoose.Types.ObjectId().toString();

        await request(express.app)
          .patch("/room/" + createdRoom!._id)
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
        await request(express.app)
          .patch("/room/" + createdRoom!._id)
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
        await request(express.app)
          .patch("/room/" + createdRoom!._id)
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
        await request(express.app)
          .delete("/room/" + createdRoom!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(createdRoom?._id.toString());
          });
      });

      it("Status 404 Error", async () => {
        await request(express.app)
          .delete("/room/" + createdRoom!._id)
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
