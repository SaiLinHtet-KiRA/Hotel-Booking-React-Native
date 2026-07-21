import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { Room, RoomDocument } from "../Room.model";
import RoomRepo from "../Room.repo";
import RoomService from "../Room.service";
import { express } from "../../server/index";
import request from "supertest";

const mockRoomData: Room = {
  number: 101,
  type: "single bed",
  photo: [],
  capacity: 2,
  price: 100,
  status: "available",
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
        expect(createdRoom.number).toBe(mockRoomData.number);
        expect(createdRoom.type).toBe(mockRoomData.type);
        expect(createdRoom.capacity).toBe(mockRoomData.capacity);
        expect(createdRoom.price).toBe(mockRoomData.price);
        expect(createdRoom.status).toBe(mockRoomData.status);
      });

      it("WITH ERROR", async () => {
        await expect(RoomRepo.create({} as Room)).rejects.toThrow();
      });

      it("WITH ERROR - duplicate room number", async () => {
        await expect(
          RoomRepo.create(mockRoomData),
        ).rejects.toThrow();
      });
    });

    describe("Get Room", () => {
      it("WITH SUCCESS", async () => {
        const room = await RoomRepo.getByID(createdRoom!._id.toString());

        expect(room._id.toString()).toBe(createdRoom?._id.toString());
        expect(room.number).toBe(createdRoom?.number);
        expect(room.type).toBe(createdRoom?.type);
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
      });

      it("WITH PAGINATION", async () => {
        const rooms = await RoomRepo.get({ page: 0, limit: 10 });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH TYPE FILTER", async () => {
        const rooms = await RoomRepo.get({ type: "single bed" });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITHOUT FILTERS", async () => {
        const rooms = await RoomRepo.get({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH STATUS FILTER", async () => {
        const rooms = await RoomRepo.get({ status: "available" });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Room", () => {
      it("WITH SUCCESS", async () => {
        const updatedRoom = await RoomRepo.update(
          createdRoom!._id.toString(),
          {
            number: 202,
            type: "deluxe",
            capacity: 4,
            price: 300,
            status: "maintenance",
          } as Room,
        );

        expect(updatedRoom!._id.toString()).toBe(createdRoom?._id.toString());
        expect(updatedRoom!.number).toBe(202);
        expect(updatedRoom!.type).toBe("deluxe");
        expect(updatedRoom!.status).toBe("maintenance");
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
        expect(createdRoom.number).toBe(mockRoomData.number);
        expect(createdRoom.type).toBe(mockRoomData.type);
        expect(createdRoom.status).toBe(mockRoomData.status);
      });

      it("WITH ERROR", async () => {
        await expect(RoomService.createRoom({} as Room)).rejects.toThrow();
      });

      it("WITH ERROR - duplicate room number", async () => {
        await expect(
          RoomService.createRoom(mockRoomData),
        ).rejects.toThrow();
      });
    });

    describe("Get Room", () => {
      it("WITH SUCCESS", async () => {
        const room = await RoomService.getRoom(createdRoom!._id.toString());

        expect(room._id.toString()).toBe(createdRoom?._id.toString());
        expect(room.number).toBe(createdRoom?.number);
      });

      it("WITH ERROR", async () => {
        await expect(RoomService.getRoom("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Rooms", () => {
      it("WITH SUCCESS", async () => {
        const { data: rooms } = await RoomService.getRooms({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH PAGINATION", async () => {
        const { data: rooms } = await RoomService.getRooms({ page: 0, limit: 10 });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH TYPE FILTER", async () => {
        const { data: rooms } = await RoomService.getRooms({ type: "single bed" });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITHOUT FILTERS", async () => {
        const { data: rooms } = await RoomService.getRooms({});

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH STATUS FILTER", async () => {
        const { data: rooms } = await RoomService.getRooms({ status: "available" });

        expect(Array.isArray(rooms)).toBe(true);
        expect(rooms.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Room", () => {
      it("WITH SUCCESS", async () => {
        const updatedRoom = await RoomService.updateRoom(
          createdRoom!._id.toString(),
          {
            number: 303,
            type: "suite",
            capacity: 5,
            price: 500,
            status: "busy",
          } as Room,
        );

        expect(updatedRoom!._id.toString()).toBe(createdRoom?._id.toString());
        expect(updatedRoom!.number).toBe(303);
        expect(updatedRoom!.type).toBe("suite");
      });

      it("WITH ERROR", async () => {
        await expect(
          RoomService.updateRoom("dadcrfdsdfs", {} as Room),
        ).rejects.toThrow();
      });

      it("WITH ERROR BECAUSE OF INVALID TYPE", async () => {
        await expect(
          RoomService.updateRoom(createdRoom!._id.toString(), {
            number: 404,
            type: "invalid-type",
            capacity: 3,
            price: 200,
          } as unknown as Room),
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

      it("Status 200 with type filter", async () => {
        await request(express.app)
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
        await request(express.app)
          .get("/room/" + createdRoom!._id)
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
        await request(express.app)
          .patch("/room/" + createdRoom!._id)
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
        await request(express.app)
          .patch("/room/" + createdRoom!._id)
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
