const request = require("supertest");
const app = require("../../../../shared/infra/http/app");
const prisma = require("../../../../database/prismaClient");

describe("Create schedule controller", () => {
  let token;

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

  it("should be able to delete a schedule", async () => {
    const { body } = await request(app)
      .post("/schedules/")
      .send({
        eventName: "Horário da Noite",
        startTime: "2023-06-22T18:30:00.120Z",
        endTime: "2023-06-22T21:30:00.120Z",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .delete(`/schedules/${body.id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
    expect(
      await request(app)
        .get("/schedules/")
        .set({ Authorization: `Bearer ${token}` })
    ).not.toContain(body);
  });
});
