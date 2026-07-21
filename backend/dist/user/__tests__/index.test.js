"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const User_repo_1 = __importDefault(require("../User.repo"));
const User_service_1 = __importDefault(require("../User.service"));
const index_1 = require("../../server/index");
const supertest_1 = __importDefault(require("supertest"));
const mockUserData = {
    name: "testuser",
    email: "test@test.com",
    password: "password123",
    role: "user",
};
let createdUser = null;
describe("User Service", () => {
    describe("User Repository", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdUser = null;
        });
        describe("Create User", () => {
            it("WITH SUCCESS", async () => {
                createdUser = await User_repo_1.default.create(mockUserData);
                expect(createdUser).not.toBeNull();
                expect(createdUser._id).not.toBeNull();
                expect(createdUser.name).toBe(mockUserData.name);
                expect(createdUser.role).toBe(mockUserData.role);
                expect(typeof createdUser.id).toBe("number");
            });
            it("WITH ERROR", async () => {
                await expect(User_repo_1.default.create({})).rejects.toThrow();
            });
            it("WITH ERROR - duplicate email", async () => {
                await expect(User_repo_1.default.create(mockUserData)).rejects.toThrow();
            });
        });
        describe("Get User", () => {
            it("WITH SUCCESS", async () => {
                const user = await User_repo_1.default.getByID(createdUser._id.toString());
                expect(user._id.toString()).toBe(createdUser?._id.toString());
                expect(user.name).toBe(createdUser?.name);
                expect(user.role).toBe(createdUser?.role);
            });
            it("WITH ERROR", async () => {
                await expect(User_repo_1.default.getByID("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("List Users", () => {
            it("WITH SUCCESS", async () => {
                const users = await User_repo_1.default.get({});
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH PAGINATION", async () => {
                const users = await User_repo_1.default.get({ page: 0, limit: 10 });
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH ROLE FILTER", async () => {
                const users = await User_repo_1.default.get({ role: "user" });
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH NAME FILTER", async () => {
                const users = await User_repo_1.default.get({ email: createdUser?.email });
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("Update User", () => {
            it("WITH SUCCESS", async () => {
                const updatedUser = await User_repo_1.default.update(createdUser._id.toString(), { name: "updateduser", role: "owner" });
                expect(updatedUser._id.toString()).toBe(createdUser?._id.toString());
                expect(updatedUser.name).toBe("updateduser");
                expect(updatedUser.role).toBe("owner");
            });
            it("WITH ERROR", async () => {
                await expect(User_repo_1.default.update("dadcrfdsdfs", {})).rejects.toThrow();
            });
        });
        describe("Delete User", () => {
            it("WITH SUCCESS", async () => {
                const deletedUser = await User_repo_1.default.delete(createdUser._id.toString());
                expect(deletedUser._id.toString()).toBe(createdUser?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(User_repo_1.default.delete("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("User Service", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdUser = null;
        });
        describe("Create User", () => {
            it("WITH SUCCESS", async () => {
                createdUser = await User_service_1.default.createUser(mockUserData);
                expect(createdUser).not.toBeNull();
                expect(createdUser._id).not.toBeNull();
                expect(createdUser.name).toBe(mockUserData.name);
                expect(createdUser.role).toBe(mockUserData.role);
                expect(typeof createdUser.id).toBe("number");
            });
            it("WITH ERROR", async () => {
                await expect(User_service_1.default.createUser({})).rejects.toThrow();
            });
            it("WITH ERROR - duplicate email", async () => {
                await expect(User_service_1.default.createUser(mockUserData)).rejects.toThrow();
            });
        });
        describe("Get User", () => {
            it("WITH SUCCESS", async () => {
                const user = await User_service_1.default.getUser(createdUser._id.toString());
                expect(user._id.toString()).toBe(createdUser?._id.toString());
                expect(user.name).toBe(createdUser?.name);
            });
            it("WITH ERROR", async () => {
                await expect(User_service_1.default.getUser("wecq22daaewccs")).rejects.toThrow();
            });
        });
        describe("List Users", () => {
            it("WITH SUCCESS", async () => {
                const { data: users } = await User_service_1.default.getUsers({});
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH PAGINATION", async () => {
                const { data: users } = await User_service_1.default.getUsers({ page: 0, limit: 10 });
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
            it("WITH ROLE FILTER", async () => {
                const { data: users } = await User_service_1.default.getUsers({ role: "user" });
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThanOrEqual(1);
            });
        });
        describe("Update User", () => {
            it("WITH SUCCESS", async () => {
                const updatedUser = await User_service_1.default.updateUser(createdUser._id.toString(), { name: "updateduser2", role: "admin" });
                expect(updatedUser._id.toString()).toBe(createdUser?._id.toString());
                expect(updatedUser.name).toBe("updateduser2");
                expect(updatedUser.role).toBe("admin");
            });
            it("WITH ERROR", async () => {
                await expect(User_service_1.default.updateUser("dadcrfdsdfs", {})).rejects.toThrow();
            });
            it("WITH ERROR BECAUSE OF INVALID ROLE", async () => {
                await expect(User_service_1.default.updateUser(createdUser._id.toString(), {
                    name: "test",
                    role: "invalid",
                })).rejects.toThrow();
            });
        });
        describe("Delete User", () => {
            it("WITH SUCCESS", async () => {
                const deletedUser = await User_service_1.default.deleteUser(createdUser._id.toString());
                expect(deletedUser._id.toString()).toBe(createdUser?._id.toString());
            });
            it("WITH ERROR", async () => {
                await expect(User_service_1.default.deleteUser("dadcrfdsdfs")).rejects.toThrow();
            });
        });
    });
    describe("User API", () => {
        beforeAll(async () => {
            await (0, mongoDBConfigTest_1.dbConnect)();
        });
        afterAll(async () => {
            await (0, mongoDBConfigTest_1.dbDisconnect)();
            createdUser = null;
        });
        describe("POST /user", () => {
            it("Status 200 Success", async () => {
                await (0, supertest_1.default)(index_1.express.app)
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
                await (0, supertest_1.default)(index_1.express.app)
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
                await (0, supertest_1.default)(index_1.express.app)
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
                await (0, supertest_1.default)(index_1.express.app)
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
                await (0, supertest_1.default)(index_1.express.app)
                    .get("/user/" + createdUser._id)
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
                await (0, supertest_1.default)(index_1.express.app)
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
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/user/" + createdUser._id)
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
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/user/" + createdUser._id)
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
                await (0, supertest_1.default)(index_1.express.app)
                    .patch("/user/" + createdUser._id)
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
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/user/" + createdUser._id)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((response) => {
                    expect(response.body.message).toBeTruthy();
                    expect(response.body.data._id).toBe(createdUser?._id.toString());
                });
            });
            it("Status 404 Error", async () => {
                await (0, supertest_1.default)(index_1.express.app)
                    .delete("/user/" + createdUser._id)
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
