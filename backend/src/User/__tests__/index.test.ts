// import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
// import { Rate, RateDocument } from "../User.model";
// import RateRepo from "../User.repo";
// import RateService from "../User.service";
// import { express } from "../../server/index";
// import request from "supertest";

// const mockRateData: Rate = {
//   value: 33,
//   currency: "THB",
//   profit: 80,
// };

// let createdRate: RateDocument | null = null;

// describe("Exchange Rate Service", () => {
//   describe("Exchange Rate Repository", () => {
//     beforeAll(async () => {
//       await dbConnect();
//     });

//     afterAll(async () => {
//       await dbDisconnect();
//       createdRate = null;
//     });

//     describe("Create Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         createdRate = await RateRepo.create(mockRateData);

//         expect(createdRate).not.toBeNull();
//         expect(createdRate._id).not.toBeNull();
//         expect(createdRate.toJSON()).toMatchObject({
//           value: mockRateData.value,
//           currency: mockRateData.currency,
//           profit: mockRateData.profit,
//         });
//       });

//       it("WITH ERROR", async () => {
//         await expect(RateRepo.create({} as Rate)).rejects.toThrow();
//       });
//     });

//     describe("Get Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         const rate = await RateRepo.getByID(createdRate!._id.toString());

//         expect(rate._id.toString()).toBe(createdRate?._id.toString());
//         expect(rate.value).toBe(createdRate?.value);
//         expect(rate.currency).toBe(createdRate?.currency);
//         expect(rate.profit).toBe(createdRate?.profit);
//       });

//       it("WITH ERROR", async () => {
//         await expect(RateRepo.getByID("wecq22daaewccs")).rejects.toThrow();
//       });
//     });

//     describe("Update Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         const mockRateData: Rate = {
//           value: 34,
//           currency: "MMK",
//           profit: 20,
//         };
//         const updatedExchangeRate = await RateRepo.update(
//           createdRate!._id.toString(),
//           mockRateData,
//         );

//         expect(updatedExchangeRate.toJSON()).toMatchObject({
//           value: mockRateData.value,
//           currency: mockRateData.currency,
//           profit: mockRateData.profit,
//         });
//       });

//       it("WITH ERROR", async () => {
//         await expect(
//           RateRepo.update("dadcrfdsdfs", {} as Rate),
//         ).rejects.toThrow();
//       });
//     });

//     describe("Delete Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         const deletedExchangeRate = await RateRepo.delete(
//           createdRate!._id.toString(),
//         );

//         expect(deletedExchangeRate._id.toString()).toBe(createdRate?._id.toString());
//       });

//       it("WITH ERROR", async () => {
//         await expect(RateRepo.delete("dadcrfdsdfs")).rejects.toThrow();
//       });
//     });
//   });

//   describe("Exchange Rate Service", () => {
//     beforeAll(async () => {
//       await dbConnect();
//     });

//     afterAll(async () => {
//       await dbDisconnect();
//       createdRate = null;
//     });

//     describe("Create Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         createdRate = await RateService.createRate(mockRateData);
//         expect(createdRate).not.toBeNull();
//         expect(createdRate._id).not.toBeNull();
//         expect(createdRate.value).toBe(mockRateData.value);
//         expect(createdRate.currency).toBe(mockRateData.currency);
//         expect(createdRate.profit).toBe(mockRateData.profit);
//       });

//       it("WITH ERROR", async () => {
//         await expect(RateService.createRate({} as Rate)).rejects.toThrow();
//       });
//     });

//     describe("Get Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         const rate = await RateService.getRate(createdRate!._id.toString());
//         expect(rate._id.toString()).toBe(createdRate?._id.toString());
//       });

//       it("WITH ERROR", async () => {
//         await expect(RateService.getRate("wecq22daaewccs")).rejects.toThrow();
//       });
//     });

//     describe("Update Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         const mockRateData: Rate = {
//           value: 34,
//           currency: "MMK",
//           profit: 20,
//         };
//         const updatedExchangeRate = await RateService.updateRate(
//           createdRate!._id.toString(),
//           mockRateData,
//         );

//         expect(updatedExchangeRate.value).toBe(mockRateData.value);
//       });

//       it("WITH ERROR", async () => {
//         await expect(
//           RateService.updateRate("dadcrfdsdfs", {} as Rate),
//         ).rejects.toThrow();
//       });

//       it("WITH ERROR BECAUSE OF PROFIT IS GREATER THAN 100", async () => {
//         const mockRateData: Rate = {
//           value: 34,
//           currency: "MMK",
//           profit: 110,
//         };
//         await expect(
//           RateService.updateRate(createdRate!._id.toString(), mockRateData),
//         ).rejects.toThrow();
//       });
//     });

//     describe("Delete Exchange Rate", () => {
//       it("WITH SUCCESS", async () => {
//         const deletedExchangeRate = await RateService.deleteRate(
//           createdRate!._id.toString(),
//         );

//         expect(deletedExchangeRate._id.toString()).toBe(createdRate?._id.toString());
//       });

//       it("WITH ERROR", async () => {
//         await expect(RateService.deleteRate("dadcrfdsdfs")).rejects.toThrow();
//       });
//     });
//   });

//   describe("Exchange Rate API", () => {
//     beforeAll(async () => {
//       await dbConnect();
//     });

//     afterAll(async () => {
//       await dbDisconnect();
//       createdRate = null;
//     });

//     describe("POST /user", () => {
//       it("Status 200 Success", async () => {
//         await request(express.app)
//           .post("/user")
//           .send(mockRateData)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(200)
//           .then((response) => {
//             createdRate = response.body.data;
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toMatchObject({
//               value: mockRateData.value,
//               currency: mockRateData.currency,
//               profit: mockRateData.profit,
//             });
//           });
//       });

//       it("Status 400 Error", async () => {
//         await request(express.app)
//           .post("/user")
//           .send({} as Rate)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(400)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toBeNull();
//           });
//       });
//     });

//     describe("GET /user/:id", () => {
//       it("Status 200 Success", async () => {
//         await request(express.app)
//           .get("/user/" + createdRate?._id)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(200)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data._id).toBe(createdRate?._id.toString());
//           });
//       });

//       it("Status 500 Error", async () => {
//         await request(express.app)
//           .get("/user/msfkmsdfsf")
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(500)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toBeNull();
//           });
//       });
//     });

//     describe("PATCH /user/:id", () => {
//       it("Status 200 Success", async () => {
//         const mockRateData: Rate = {
//           value: 34,
//           currency: "MMK",
//           profit: 20,
//         };
//         await request(express.app)
//           .patch("/user/" + createdRate?._id)
//           .send(mockRateData)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(200)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toMatchObject({
//               value: mockRateData.value,
//               currency: mockRateData.currency,
//               profit: mockRateData.profit,
//             });
//           });
//       });

//       it("Status 400 Error BECAUSE OF GREATER THAN 100", async () => {
//         const mockRateData: Rate = {
//           value: 34,
//           currency: "MMK",
//           profit: 101,
//         };
//         await request(express.app)
//           .patch("/user/" + createdRate?._id)
//           .send(mockRateData)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(400)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toBeNull();
//           });
//       });

//       it("Status 400 Error", async () => {
//         await request(express.app)
//           .patch("/user/" + createdRate?._id)
//           .send({})
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(400)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toBeNull();
//           });
//       });
//     });

//     describe("DELETE /user/:id", () => {
//       it("Status 200 Success", async () => {
//         await request(express.app)
//           .delete("/user/" + createdRate?._id)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(200)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data._id).toBe(createdRate?._id.toString());
//           });
//       });

//       it("Status 404 Error", async () => {
//         await request(express.app)
//           .delete("/user/" + createdRate?._id)
//           .set("Accept", "application/json")
//           .expect("Content-Type", /json/)
//           .expect(404)
//           .then((response) => {
//             expect(response.body.message).toBeTruthy();
//             expect(response.body.data).toBeNull();
//           });
//       });
//     });
//   });
// });
