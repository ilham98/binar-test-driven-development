const request = require("supertest");
const app = require("../src/app");
const User = require("../src/user/User");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe("User Registration", () => {
  const postValidUser = async () => {
    return await request(app).post("/api/1.0/users").send({
      username: "user1",
      email: "user1@mail.com",
      password: "password",
    });
  };

  it("returns 200 OK when signup request is valid", async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe("User berhasil dibuat");
  });

  it("saves the user to databse", async () => {
    await postValidUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it("saves the username and email to database", async () => {
    await postValidUser();
    const user = await User.findOne();
    expect(user.username).toBe("user1");
    expect(user.email).toBe("user1@mail.com");
  });

  it("hashes the passowrd in database", async () => {
    await postValidUser();
    const user = await User.findOne();
    expect(user.password).not.toBe("password");
  });
});
