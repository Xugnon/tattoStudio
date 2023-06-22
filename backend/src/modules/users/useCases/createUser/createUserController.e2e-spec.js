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

    expect(response.status).toBe(201);
  });
});
