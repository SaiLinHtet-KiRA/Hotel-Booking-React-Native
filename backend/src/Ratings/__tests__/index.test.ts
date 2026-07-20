import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { Ratings, RatingsDocument } from "../Ratings.model";
import RatingsRepo from "../Ratings.repo";
import RatingsService from "../Ratings.service";
import { express } from "../../server/index";
import request from "supertest";

let createdRatings: RatingsDocument | null = null;

describe("Ratings Service", () => {
  describe("Ratings Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRatings = null;
    });

    describe("Create Ratings", () => {
      it("WITH SUCCESS", async () => {
        createdRatings = await RatingsRepo.create({ ratings: [] });

        expect(createdRatings).not.toBeNull();
        expect(createdRatings._id).not.toBeNull();
        expect(createdRatings.average).toBe(0);
        expect(createdRatings.ratings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(RatingsRepo.create({} as Ratings)).rejects.toThrow();
      });
    });

    describe("Get Ratings", () => {
      it("WITH SUCCESS", async () => {
        const ratings = await RatingsRepo.getByID(createdRatings!._id.toString());

        expect(ratings).toMatchObject({
          _id: createdRatings?._id,
          average: createdRatings?.average,
        });
        expect(ratings.ratings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(RatingsRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("Update Ratings", () => {
      it("WITH SUCCESS", async () => {
        const ratingId = new mongoose.Types.ObjectId();
        const updatedRatings = await RatingsRepo.update(
          createdRatings!._id.toString(),
          { ratings: [ratingId] },
        );

        expect(updatedRatings._id.toString()).toBe(createdRatings?._id.toString());
        expect(updatedRatings.ratings.length).toBe(1);
      });

      it("WITH ERROR", async () => {
        await expect(
          RatingsRepo.update("dadcrfdsdfs", {} as Ratings),
        ).rejects.toThrow();
      });
    });

    describe("Delete Ratings", () => {
      it("WITH SUCCESS", async () => {
        const deletedRatings = await RatingsRepo.delete(
          createdRatings!._id.toString(),
        );

        expect(deletedRatings._id.toString()).toBe(createdRatings?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(RatingsRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Ratings Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRatings = null;
    });

    describe("Create Ratings", () => {
      it("WITH SUCCESS", async () => {
        createdRatings = await RatingsService.createRatings({ ratings: [] });
        expect(createdRatings).not.toBeNull();
        expect(createdRatings._id).not.toBeNull();
        expect(createdRatings.average).toBe(0);
        expect(createdRatings.ratings).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(RatingsService.createRatings({} as Ratings)).rejects.toThrow();
      });
    });

    describe("Get Ratings", () => {
      it("WITH SUCCESS", async () => {
        const ratings = await RatingsService.getRating(createdRatings!._id.toString());
        expect(ratings._id.toString()).toBe(createdRatings?._id.toString());
        expect(ratings.average).toBe(0);
      });

      it("WITH ERROR", async () => {
        await expect(RatingsService.getRating("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("Calculate Average Rating", () => {
      it("WITH SUCCESS", async () => {
        const average = await RatingsService.calculateAverageRating(
          createdRatings!._id.toString(),
        );
        expect(average).toBe(0);
      });

      it("WITH ERROR - non-existent ID", async () => {
        await expect(
          RatingsService.calculateAverageRating("507f1f77bcf86cd799439011"),
        ).rejects.toThrow();
      });
    });

    describe("Update Ratings", () => {
      it("WITH SUCCESS", async () => {
        const ratingId = new mongoose.Types.ObjectId();
        const updatedRatings = await RatingsService.updateRatings(
          createdRatings!._id.toString(),
          { ratings: [ratingId] },
        );

        expect(updatedRatings._id.toString()).toBe(createdRatings?._id.toString());
        expect(updatedRatings.ratings.length).toBe(1);
      });

      it("WITH ERROR", async () => {
        await expect(
          RatingsService.updateRatings("dadcrfdsdfs", {} as Ratings),
        ).rejects.toThrow();
      });
    });

    describe("Delete Ratings", () => {
      it("WITH SUCCESS", async () => {
        const deletedRatings = await RatingsService.deleteRatings(
          createdRatings!._id.toString(),
        );

        expect(deletedRatings._id.toString()).toBe(createdRatings?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(RatingsService.deleteRatings("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Ratings API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRatings = null;
    });

    describe("GET /ratings/:id", () => {
      beforeAll(async () => {
        createdRatings = await RatingsService.createRatings({ ratings: [] });
      });

      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/ratings/" + createdRatings!._id)
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
        await request(express.app)
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
