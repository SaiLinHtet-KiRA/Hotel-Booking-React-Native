import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { Bookings, BookingsDocument } from "../Bookings.model";
import BookingsRepo from "../Bookings.repo";
import BookingsService from "../Bookings.service";
import { express } from "../../server/index";
import request from "supertest";

let createdBookings: BookingsDocument | null = null;

describe("Bookings Service", () => {
  describe("Bookings Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdBookings = null;
    });

    describe("Create Bookings", () => {
      it("WITH SUCCESS", async () => {
        createdBookings = await BookingsRepo.create({ bookings: [] });

        expect(createdBookings).not.toBeNull();
        expect(createdBookings._id).not.toBeNull();
        expect(createdBookings.bookings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(BookingsRepo.create({} as Bookings)).rejects.toThrow();
      });
    });

    describe("Get Bookings", () => {
      it("WITH SUCCESS", async () => {
        const bookings = await BookingsRepo.getByID(
          createdBookings!._id.toString(),
        );

        expect(bookings).toMatchObject({
          _id: createdBookings?._id,
        });
        expect(bookings.bookings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsRepo.getByID("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update Bookings", () => {
      it("WITH SUCCESS", async () => {
        const bookingId = new mongoose.Types.ObjectId();
        const updatedBookings = await BookingsRepo.update(
          createdBookings!._id.toString(),
          { bookings: [bookingId] },
        );

        expect(updatedBookings._id.toString()).toBe(
          createdBookings?._id.toString(),
        );
        expect(updatedBookings.bookings.length).toBe(1);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsRepo.update("dadcrfdsdfs", {} as Bookings),
        ).rejects.toThrow();
      });
    });

    describe("Delete Bookings", () => {
      it("WITH SUCCESS", async () => {
        const deletedBookings = await BookingsRepo.delete(
          createdBookings!._id.toString(),
        );

        expect(deletedBookings._id.toString()).toBe(
          createdBookings?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsRepo.delete("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("Bookings Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdBookings = null;
    });

    describe("Create Bookings", () => {
      it("WITH SUCCESS", async () => {
        createdBookings = await BookingsService.createBookings({ bookings: [] });
        expect(createdBookings).not.toBeNull();
        expect(createdBookings._id).not.toBeNull();
        expect(createdBookings.bookings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsService.createBookings({} as Bookings),
        ).rejects.toThrow();
      });
    });

    describe("Get Bookings", () => {
      it("WITH SUCCESS", async () => {
        const bookings = await BookingsService.getBooking(
          createdBookings!._id.toString(),
        );
        expect(bookings._id.toString()).toBe(createdBookings?._id.toString());
        expect(bookings.bookings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsService.getBooking("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update Bookings", () => {
      it("WITH SUCCESS", async () => {
        const bookingId = new mongoose.Types.ObjectId();
        const updatedBookings = await BookingsService.updateBookings(
          createdBookings!._id.toString(),
          { bookings: [bookingId] },
        );

        expect(updatedBookings._id.toString()).toBe(
          createdBookings?._id.toString(),
        );
        expect(updatedBookings.bookings.length).toBe(1);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsService.updateBookings("dadcrfdsdfs", {} as Bookings),
        ).rejects.toThrow();
      });
    });

    describe("Delete Bookings", () => {
      it("WITH SUCCESS", async () => {
        const deletedBookings = await BookingsService.deleteBookings(
          createdBookings!._id.toString(),
        );

        expect(deletedBookings._id.toString()).toBe(
          createdBookings?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingsService.deleteBookings("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("Bookings API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdBookings = null;
    });

    describe("GET /bookings/:id", () => {
      beforeAll(async () => {
        createdBookings = await BookingsService.createBookings({ bookings: [] });
      });

      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/bookings/" + createdBookings!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(
              createdBookings?._id.toString(),
            );
          });
      });

      it("Status 500 Error", async () => {
        await request(express.app)
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
