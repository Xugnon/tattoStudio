const request = require("supertest");
const app = require("../../../../shared/infra/http/app");
const prisma = require("../../../../database/prismaClient");

describe("Create service controller", () => {
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

  it("should be able to create a new service", async () => {
    const response = await request(app)
      .post("/services/")
      .send({
        title: "Test Tattoo",
        description: "Test Description",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});
