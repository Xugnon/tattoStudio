const request = require("supertest");
const app = require("../../../../shared/infra/http/app");

describe("Show user controller", () => {
  var token;

  beforeAll(async () => {
    await request(app).post("/users/").send({
      name: "Test Name",
      email: "testExample@mail.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    });

    const { body } = await request(app)
      .post("/users/auth")
      .send({ email: "testExample@mail.com", password: "testPassword" });

    token = body;
  });

  it("should be able to show a existing user", async () => {
    const response = await request(app)
      .get("/users/")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should throw an error when a invalid ID is provided", async () => {
    const response = await request(app)
      .get("/users/")
      .set({ Authorization: `Bearer ${"fakeToken"}` });

    expect(response.statusCode).toBe(401);
    expect(response.error.text).toContain("Invalid token!!");
  });
});
