import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../../util/mongoDBConfigTest";
import { Rating, RatingDocument } from "../Rating.model";
import RatingRepo from "../Rating.repo";
import RatingService from "../Rating.service";
import { express } from "../../../server/index";
import request from "supertest";

const mockRatingData: Rating = {
  user: new mongoose.Types.ObjectId(),
  RatingsId: new mongoose.Types.ObjectId(),
  rating: 4,
  feed_back: "Great room!",
};

let createdRating: RatingDocument | null = null;

describe("Rating Service", () => {
  describe("Rating Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRating = null;
    });

    describe("Create Rating", () => {
      it("WITH SUCCESS", async () => {
        createdRating = await RatingRepo.create(mockRatingData);

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
        await expect(RatingRepo.create({} as Rating)).rejects.toThrow();
      });
    });

    describe("Get Rating", () => {
      it("WITH SUCCESS", async () => {
        const rating = await RatingRepo.getByID(createdRating!._id.toString());

        expect(rating).toMatchObject({
          _id: createdRating?._id,
          user: createdRating?.user,
          RatingsId: createdRating?.RatingsId,
          rating: createdRating?.rating,
          feed_back: createdRating?.feed_back,
        });
      });

      it("WITH ERROR", async () => {
        await expect(RatingRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("Update Rating", () => {
      it("WITH SUCCESS", async () => {
        const updatedData: Rating = {
          user: new mongoose.Types.ObjectId(),
          RatingsId: mockRatingData.RatingsId,
          rating: 5,
          feed_back: "Excellent!",
        };
        const updatedRating = await RatingRepo.update(
          createdRating!._id.toString(),
          updatedData,
        );

        expect(updatedRating).toMatchObject({
          _id: createdRating?._id,
          rating: updatedData.rating,
          feed_back: updatedData.feed_back,
        });
      });

      it("WITH ERROR", async () => {
        await expect(
          RatingRepo.update("dadcrfdsdfs", {} as Rating),
        ).rejects.toThrow();
      });
    });

    describe("Delete Rating", () => {
      it("WITH SUCCESS", async () => {
        const deletedRating = await RatingRepo.delete(
          createdRating!._id.toString(),
        );

        expect(deletedRating).toMatchObject({
          _id: createdRating?._id,
        });
      });

      it("WITH ERROR", async () => {
        await expect(RatingRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Rating Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRating = null;
    });

    describe("Create Rating", () => {
      it("WITH SUCCESS", async () => {
        createdRating = await RatingService.createRating(mockRatingData);
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
        await expect(RatingService.createRating({} as Rating)).rejects.toThrow();
      });
    });

    describe("Get Rating", () => {
      it("WITH SUCCESS", async () => {
        const rating = await RatingService.getRating(createdRating!._id.toString());
        expect(rating).toMatchObject({
          _id: createdRating?._id,
          user: createdRating?.user,
          RatingsId: createdRating?.RatingsId,
          rating: createdRating?.rating,
          feed_back: createdRating?.feed_back,
        });
      });

      it("WITH ERROR", async () => {
        await expect(RatingService.getRating("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("Update Rating", () => {
      it("WITH SUCCESS", async () => {
        const updatedData: Rating = {
          user: new mongoose.Types.ObjectId(),
          RatingsId: mockRatingData.RatingsId,
          rating: 5,
          feed_back: "Excellent!",
        };
        const updatedRating = await RatingService.updateRating(
          createdRating!._id.toString(),
          updatedData,
        );

        expect(updatedRating).toMatchObject({
          _id: createdRating?._id,
          rating: updatedData.rating,
          feed_back: updatedData.feed_back,
        });
      });

      it("WITH ERROR", async () => {
        await expect(
          RatingService.updateRating("dadcrfdsdfs", {} as Rating),
        ).rejects.toThrow();
      });

      it("WITH ERROR BECAUSE OF RATING IS GREATER THAN 5", async () => {
        const invalidData: Rating = {
          user: new mongoose.Types.ObjectId(),
          RatingsId: new mongoose.Types.ObjectId(),
          rating: 6,
          feed_back: "Too high!",
        };
        await expect(
          RatingService.updateRating(createdRating!._id.toString(), invalidData),
        ).rejects.toThrow();
      });
    });

    describe("Delete Rating", () => {
      it("WITH SUCCESS", async () => {
        const deletedRating = await RatingService.deleteRating(
          createdRating!._id.toString(),
        );

        expect(deletedRating).toMatchObject({
          _id: createdRating?._id,
        });
      });

      it("WITH ERROR", async () => {
        await expect(RatingService.deleteRating("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Rating API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdRating = null;
    });

    describe("POST /rating", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
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
        await request(express.app)
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
        await request(express.app)
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
        await request(express.app)
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
          user: new mongoose.Types.ObjectId().toString(),
          RatingsId: mockRatingData.RatingsId.toString(),
          rating: 3,
          feed_back: "Updated feedback",
        };
        await request(express.app)
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
        await request(express.app)
          .patch("/rating/" + createdRating?._id)
          .send({
            user: new mongoose.Types.ObjectId().toString(),
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
        await request(express.app)
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
        await request(express.app)
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
        await request(express.app)
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
