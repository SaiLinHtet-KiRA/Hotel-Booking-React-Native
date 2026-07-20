import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../../util/mongoDBConfigTest";
import { Booking, BookingDocument } from "../Booking.model";
import BookingRepo from "../Booking.repo";
import BookingService from "../Booking.service";
import { express } from "../../../server/index";
import request from "supertest";

const mockBookingData: Booking = {
  user: new mongoose.Types.ObjectId(),
  room: new mongoose.Types.ObjectId(),
  bookings: new mongoose.Types.ObjectId(),
  startDate: new Date(),
  endDate: new Date(Date.now() + 86400000),
};

let createdBooking: BookingDocument | null = null;

describe("Booking Service", () => {
  describe("Booking Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdBooking = null;
    });

    describe("Create Booking", () => {
      it("WITH SUCCESS", async () => {
        createdBooking = await BookingRepo.create(mockBookingData);

        expect(createdBooking).not.toBeNull();
        expect(createdBooking._id).not.toBeNull();
        expect(createdBooking.user.toString()).toBe(
          mockBookingData.user.toString(),
        );
        expect(createdBooking.room.toString()).toBe(
          mockBookingData.room.toString(),
        );
        expect(createdBooking.startDate).toBeInstanceOf(Date);
        expect(createdBooking.endDate).toBeInstanceOf(Date);
      });

      it("WITH ERROR", async () => {
        await expect(BookingRepo.create({} as Booking)).rejects.toThrow();
      });
    });

    describe("Get Booking", () => {
      it("WITH SUCCESS", async () => {
        const booking = await BookingRepo.getByID(
          createdBooking!._id.toString(),
        );

        expect(booking._id.toString()).toBe(createdBooking?._id.toString());
        expect(booking.user.toString()).toBe(
          createdBooking?.user.toString(),
        );
        expect(booking.room.toString()).toBe(
          createdBooking?.room.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingRepo.getByID("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update Booking", () => {
      it("WITH SUCCESS", async () => {
        const newStartDate = new Date(Date.now() + 1000000);
        const newEndDate = new Date(Date.now() + 96400000);
        const updatedBooking = await BookingRepo.update(
          createdBooking!._id.toString(),
          {
            startDate: newStartDate,
            endDate: newEndDate,
          } as Booking,
        );

        expect(updatedBooking!._id.toString()).toBe(
          createdBooking?._id.toString(),
        );
        expect(updatedBooking!.startDate).toBeInstanceOf(Date);
        expect(updatedBooking!.endDate).toBeInstanceOf(Date);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingRepo.update("dadcrfdsdfs", {} as Booking),
        ).rejects.toThrow();
      });
    });

    describe("Delete Booking", () => {
      it("WITH SUCCESS", async () => {
        const deletedBooking = await BookingRepo.delete(
          createdBooking!._id.toString(),
        );

        expect(deletedBooking._id.toString()).toBe(
          createdBooking?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingRepo.delete("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("Booking Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdBooking = null;
    });

    describe("Create Booking", () => {
      it("WITH SUCCESS", async () => {
        createdBooking = await BookingService.createBooking(mockBookingData);
        expect(createdBooking).not.toBeNull();
        expect(createdBooking._id).not.toBeNull();
        expect(createdBooking.user.toString()).toBe(
          mockBookingData.user.toString(),
        );
        expect(createdBooking.startDate).toBeInstanceOf(Date);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingService.createBooking({} as Booking),
        ).rejects.toThrow();
      });

      it("WITH ERROR - endDate before startDate", async () => {
        const invalidData: Booking = {
          user: new mongoose.Types.ObjectId(),
          room: new mongoose.Types.ObjectId(),
          bookings: new mongoose.Types.ObjectId(),
          startDate: new Date(Date.now() + 86400000),
          endDate: new Date(),
        };
        await expect(
          BookingService.createBooking(invalidData),
        ).rejects.toThrow();
      });
    });

    describe("Get Booking", () => {
      it("WITH SUCCESS", async () => {
        const booking = await BookingService.getBooking(
          createdBooking!._id.toString(),
        );
        expect(booking._id.toString()).toBe(createdBooking?._id.toString());
        expect(booking.user.toString()).toBe(
          createdBooking?.user.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingService.getBooking("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update Booking", () => {
      it("WITH SUCCESS", async () => {
        const newStartDate = new Date(Date.now() + 2000000);
        const newEndDate = new Date(Date.now() + 106400000);
        const updatedBooking = await BookingService.updateBooking(
          createdBooking!._id.toString(),
          {
            startDate: newStartDate,
            endDate: newEndDate,
          } as Booking,
        );

        expect(updatedBooking!._id.toString()).toBe(
          createdBooking?._id.toString(),
        );
        expect(updatedBooking!.startDate).toBeInstanceOf(Date);
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingService.updateBooking("dadcrfdsdfs", {} as Booking),
        ).rejects.toThrow();
      });
    });

    describe("Delete Booking", () => {
      it("WITH SUCCESS", async () => {
        const deletedBooking = await BookingService.deleteBooking(
          createdBooking!._id.toString(),
        );

        expect(deletedBooking._id.toString()).toBe(
          createdBooking?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          BookingService.deleteBooking("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("Booking API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdBooking = null;
    });

    describe("POST /booking", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
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
            expect(response.body.data.user).toBe(
              mockBookingData.user.toString(),
            );
            expect(response.body.data.room).toBe(
              mockBookingData.room.toString(),
            );
            expect(response.body.data.startDate).toBeDefined();
            expect(response.body.data.endDate).toBeDefined();
          });
      });

      it("Status 400 Error", async () => {
        await request(express.app)
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
        await request(express.app)
          .get("/booking/" + createdBooking!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(
              createdBooking?._id.toString(),
            );
            expect(response.body.data.user).toBe(
              createdBooking?.user.toString(),
            );
          });
      });

      it("Status 500 Error", async () => {
        await request(express.app)
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
        await request(express.app)
          .delete("/booking/" + createdBooking!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(
              createdBooking?._id.toString(),
            );
          });
      });

      it("Status 404 Error", async () => {
        await request(express.app)
          .delete("/booking/" + createdBooking!._id)
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
