const request = require("supertest");
const app = require("../../../../shared/infra/http/app");

describe("Authenticate user controller", () => {
  beforeAll(async () => {
    await request(app).post("/users/").send({
      name: "Test Name",
      email: "testExample@mail.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    });
  });

  it("should be able to authenticate a user and return a token", async () => {
    const response = await request(app).post("/users/auth").send({
      email: "testExample@mail.com",
      password: "testPassword",
    });

    expect(response.statusCode).toBe(200);
  });

  it("should throw an error when email is not found", async () => {
    const response = await request(app).post("/users/auth").send({
      email: "falseExample@mail.com", //false email
      password: "testPassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.error.text).toContain("Email or Password invalid!!");
  });

  it("should throw an error when password is not found", async () => {
    const response = await request(app).post("/users/auth").send({
      email: "testExample@mail.com",
      password: "falsePassword", //false password
    });

    expect(response.statusCode).toBe(401);
    expect(response.error.text).toContain("Email or Password invalid!!");
  });
});
