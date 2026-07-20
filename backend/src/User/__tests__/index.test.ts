import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { User, UserDocument } from "../User.model";
import UserRepo from "../User.repo";
import UserService from "../User.service";
import { express } from "../../server/index";
import request from "supertest";

const mockUserData: User = {
  name: "testuser",
  email: "test@test.com",
  password: "password123",
  role: "user",
};

let createdUser: UserDocument | null = null;

describe("User Service", () => {
  describe("User Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdUser = null;
    });

    describe("Create User", () => {
      it("WITH SUCCESS", async () => {
        createdUser = await UserRepo.create(mockUserData);

        expect(createdUser).not.toBeNull();
        expect(createdUser._id).not.toBeNull();
        expect(createdUser.name).toBe(mockUserData.name);
        expect(createdUser.role).toBe(mockUserData.role);
        expect(typeof createdUser.id).toBe("number");
      });

      it("WITH ERROR", async () => {
        await expect(UserRepo.create({} as User)).rejects.toThrow();
      });

      it("WITH ERROR - duplicate email", async () => {
        await expect(
          UserRepo.create(mockUserData),
        ).rejects.toThrow();
      });
    });

    describe("Get User", () => {
      it("WITH SUCCESS", async () => {
        const user = await UserRepo.getByID(createdUser!._id.toString());

        expect(user._id.toString()).toBe(createdUser?._id.toString());
        expect(user.name).toBe(createdUser?.name);
        expect(user.role).toBe(createdUser?.role);
      });

      it("WITH ERROR", async () => {
        await expect(UserRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Users", () => {
      it("WITH SUCCESS", async () => {
        const users = await UserRepo.get({});

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH PAGINATION", async () => {
        const users = await UserRepo.get({ page: 0, limit: 10 });

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH ROLE FILTER", async () => {
        const users = await UserRepo.get({ role: "user" });

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH NAME FILTER", async () => {
        const users = await UserRepo.get({ email: createdUser?.email });

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update User", () => {
      it("WITH SUCCESS", async () => {
        const updatedUser = await UserRepo.update(
          createdUser!._id.toString(),
          { name: "updateduser", role: "owner" },
        );

        expect(updatedUser!._id.toString()).toBe(createdUser?._id.toString());
        expect(updatedUser!.name).toBe("updateduser");
        expect(updatedUser!.role).toBe("owner");
      });

      it("WITH ERROR", async () => {
        await expect(
          UserRepo.update("dadcrfdsdfs", {} as User),
        ).rejects.toThrow();
      });
    });

    describe("Delete User", () => {
      it("WITH SUCCESS", async () => {
        const deletedUser = await UserRepo.delete(
          createdUser!._id.toString(),
        );

        expect(deletedUser._id.toString()).toBe(createdUser?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(UserRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("User Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdUser = null;
    });

    describe("Create User", () => {
      it("WITH SUCCESS", async () => {
        createdUser = await UserService.createUser(mockUserData);
        expect(createdUser).not.toBeNull();
        expect(createdUser._id).not.toBeNull();
        expect(createdUser.name).toBe(mockUserData.name);
        expect(createdUser.role).toBe(mockUserData.role);
        expect(typeof createdUser.id).toBe("number");
      });

      it("WITH ERROR", async () => {
        await expect(UserService.createUser({} as User)).rejects.toThrow();
      });

      it("WITH ERROR - duplicate email", async () => {
        await expect(
          UserService.createUser(mockUserData),
        ).rejects.toThrow();
      });
    });

    describe("Get User", () => {
      it("WITH SUCCESS", async () => {
        const user = await UserService.getUser(createdUser!._id.toString());
        expect(user._id.toString()).toBe(createdUser?._id.toString());
        expect(user.name).toBe(createdUser?.name);
      });

      it("WITH ERROR", async () => {
        await expect(UserService.getUser("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Users", () => {
      it("WITH SUCCESS", async () => {
        const users = await UserService.getUsers({});

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH PAGINATION", async () => {
        const users = await UserService.getUsers({ page: 0, limit: 10 });

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });

      it("WITH ROLE FILTER", async () => {
        const users = await UserService.getUsers({ role: "user" });

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update User", () => {
      it("WITH SUCCESS", async () => {
        const updatedUser = await UserService.updateUser(
          createdUser!._id.toString(),
          { name: "updateduser2", role: "admin" },
        );

        expect(updatedUser!._id.toString()).toBe(createdUser?._id.toString());
        expect(updatedUser!.name).toBe("updateduser2");
        expect(updatedUser!.role).toBe("admin");
      });

      it("WITH ERROR", async () => {
        await expect(
          UserService.updateUser("dadcrfdsdfs", {} as User),
        ).rejects.toThrow();
      });

      it("WITH ERROR BECAUSE OF INVALID ROLE", async () => {
        await expect(
          UserService.updateUser(createdUser!._id.toString(), {
            name: "test",
            role: "invalid",
          }),
        ).rejects.toThrow();
      });
    });

    describe("Delete User", () => {
      it("WITH SUCCESS", async () => {
        const deletedUser = await UserService.deleteUser(
          createdUser!._id.toString(),
        );

        expect(deletedUser._id.toString()).toBe(createdUser?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(UserService.deleteUser("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("User API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdUser = null;
    });

    describe("POST /user", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .post("/user")
          .send(mockUserData)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            createdUser = response.body.data;
            expect(response.body.message).toBeTruthy();
            expect(response.body.data.name).toBe(mockUserData.name);
            expect(response.body.data.role).toBe(mockUserData.role);
            expect(response.body.data.id).toBeGreaterThan(0);
          });
      });

      it("Status 400 Error", async () => {
        await request(express.app)
          .post("/user")
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

    describe("GET /user", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/user")
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
          .get("/user?page=0&limit=10")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(Array.isArray(response.body.data)).toBe(true);
          });
      });
    });

    describe("GET /user/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/user/" + createdUser!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(createdUser?._id.toString());
            expect(response.body.data.name).toBe(createdUser?.name);
            expect(response.body.data.id).toBeGreaterThan(0);
          });
      });

      it("Status 500 Error", async () => {
        await request(express.app)
          .get("/user/msfkmsdfsf")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(500)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });
    });

    describe("PATCH /user/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .patch("/user/" + createdUser!._id)
          .send({ name: "updateduser3", role: "owner" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(createdUser?._id.toString());
            expect(response.body.data.name).toBe("updateduser3");
            expect(response.body.data.role).toBe("owner");
          });
      });

      it("Status 400 Error BECAUSE OF INVALID ROLE", async () => {
        await request(express.app)
          .patch("/user/" + createdUser!._id)
          .send({ name: "test", role: "invalid" })
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
          .patch("/user/" + createdUser!._id)
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

    describe("DELETE /user/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .delete("/user/" + createdUser!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(createdUser?._id.toString());
          });
      });

      it("Status 404 Error", async () => {
        await request(express.app)
          .delete("/user/" + createdUser!._id)
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
