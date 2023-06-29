const request = require("supertest");
const app = require("../../../../shared/infra/http/app");

describe("Create user controller", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users/").send({
      name: "Test Name",
      email: "testExample@mail.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should throw an error when email already exists", async () => {
    const response = await request(app).post("/users/").send({
      name: "Test Name",
      email: "testExample@mail.com", //same email
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "99999999999",
    });

    expect(response.statusCode).toBe(409);
    expect(response.error.text).toContain("Email or Number already in use!!");
  });

  it("should throw an error when pessoal number already exists", async () => {
    const response = await request(app).post("/users/").send({
      name: "Test Name",
      email: "exampleTest@mail.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801", //same número
    });

    expect(response.statusCode).toBe(409);
    expect(response.error.text).toContain("Email or Number already in use!!");
  });
});
