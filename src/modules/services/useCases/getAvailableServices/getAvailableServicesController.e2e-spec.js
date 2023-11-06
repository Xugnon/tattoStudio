const request = require("supertest");
const app = require("../../../../shared/infra/http/app");
const prisma = require("../../../../database/prismaClient");

describe("Get available services controller", () => {
  var token;

  beforeAll(async () => {
    const user = await request(app).post("/users/").send({
      name: "Test Name",
      email: "testExample@mail.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    });

    await prisma.users.update({
      where: { id: user.body.id },
      data: { isAdmin: true },
    });

    const { body } = await request(app)
      .post("/users/auth")
      .send({ email: "testExample@mail.com", password: "testPassword" });

    token = body;
  });

  afterAll(async () => {
    prisma.$disconnect;
  });

  it("should be able to get available's services", async () => {
    const { body } = await request(app)
      .post("/services/")
      .send({ title: "Test Tattoo", description: "Test Description Tattoo" })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .get("/services/")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(201);
    expect(response.body).toContainEqual(body);
  });
});
