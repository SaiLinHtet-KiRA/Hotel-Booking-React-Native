import { dbConnect, dbDisconnect } from "../../../util/mongoDBConfigTest";
import { User } from "../../User.model";
import UserService from "../../User.service";
import UserRepo from "../../User.repo";
import AuthService from "../Auth.service";
import { express } from "../../../server/index";
import request from "supertest";

const mockUserData: User = {
  name: "authuser",
  email: "auth@test.com",
  password: "password123",
  role: "user",
};

const mockAdminData: User = {
  name: "authadmin",
  email: "adminauth@test.com",
  password: "password123",
  role: "admin",
};

let createdUserId: string | null = null;
let createdAdminId: string | null = null;
let authCookie: string | null = null;

describe("Auth Service", () => {
  describe("Auth Service - checkPasswordIsCorrect", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
    });

    it("WITH SUCCESS", async () => {
      const user = await UserService.createUser(mockUserData);

      const userId = await AuthService.checkPasswordIsCorrect({
        email: mockUserData.email,
        password: mockUserData.password,
      });

      expect(userId).toBe(user._id.toString());
    });

    it("WITH ERROR - wrong password", async () => {
      await expect(
        AuthService.checkPasswordIsCorrect({
          email: mockUserData.email,
          password: "wrongpassword",
        }),
      ).rejects.toThrow();
    });

    it("WITH ERROR - non-existent email", async () => {
      await expect(
        AuthService.checkPasswordIsCorrect({
          email: "nonexistent@test.com",
          password: "password123",
        }),
      ).rejects.toThrow();
    });

    it("WITH ERROR - invalid email format", async () => {
      await expect(
        AuthService.checkPasswordIsCorrect({
          email: "not-an-email",
          password: "password123",
        }),
      ).rejects.toThrow();
    });

    it("WITH ERROR - short password", async () => {
      await expect(
        AuthService.checkPasswordIsCorrect({
          email: mockUserData.email,
          password: "short",
        }),
      ).rejects.toThrow();
    });
  });

  describe("Auth API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
    });

    describe("POST /auth/login", () => {
      beforeAll(async () => {
        createdUserId = (await UserService.createUser(mockUserData))._id.toString();
      });

      it("Status 200 Success", async () => {
        const response = await request(express.app)
          .post("/auth/login")
          .send({
            email: mockUserData.email,
            password: mockUserData.password,
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);

        expect(response.body.message).toBe("Login success");
        authCookie = response.headers["set-cookie"][0];
      });

      it("Status 400 Error - missing fields", async () => {
        await request(express.app)
          .post("/auth/login")
          .send({})
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });

      it("Status 403 Error - wrong password", async () => {
        await request(express.app)
          .post("/auth/login")
          .send({
            email: mockUserData.email,
            password: "wrongpassword",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(403)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });

      it("Status 403 Error - non-existent user", async () => {
        await request(express.app)
          .post("/auth/login")
          .send({
            email: "nonexistent@test.com",
            password: "password123",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(403)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });
    });

    describe("GET /auth/profile", () => {
      it("Status 200 Success - logged in", async () => {
        await request(express.app)
          .get("/auth/profile")
          .set("Cookie", authCookie!)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBe("Logged In");
            expect(response.body.data._id).toBe(createdUserId);
            expect(response.body.data.name).toBe(mockUserData.name);
            expect(response.body.data.role).toBe(mockUserData.role);
            expect(response.body.data.id).toBeGreaterThan(0);
          });
      });

      it("Status 401 Error - not logged in", async () => {
        await request(express.app)
          .get("/auth/profile")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Not logged in");
            expect(response.body.data).toBeUndefined();
          });
      });
    });

    describe("POST /auth/logout", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .post("/auth/logout")
          .set("Cookie", authCookie!)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBe("Logged out");
          });
      });

      it("Status 200 Success - already logged out", async () => {
        await request(express.app)
          .post("/auth/logout")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBe("Logged out");
          });
      });
    });
  });
});
