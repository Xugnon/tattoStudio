const request = require("supertest");
const app = require("../../../../shared/infra/http/app");
const prisma = require("../../../../database/prismaClient");

describe("Insert user service controller", () => {
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

  it("should be able to insert a user schedule", async () => {
    const { body: service } = await request(app)
      .post("/services/")
      .send({
        title: "Test Tattoo",
        description: "Test Description",
      })
      .set({ Authorization: `Bearer ${token}` });

    await request(app)
      .put(`/services/${service.id}`)
      .set({ Authorization: `Bearer ${token}` });

    const { body: schedule } = await request(app)
      .post("/schedules/")
      .send({
        eventName: "Horário da Noite",
        startTime: "2023-06-22T18:30:00.120Z",
        endTime: "2023-06-22T21:30:00.120Z",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .put(`/schedules/${schedule.id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBeTruthy();
  });

  it("should throw an error if user is not found", async () => {
    const { body: service } = await request(app)
      .post("/services/")
      .send({
        title: "Test Tattoo",
        description: "Test Description",
      })
      .set({ Authorization: `Bearer ${token}` });

    await request(app)
      .put(`/services/${service.id}`)
      .set({ Authorization: `Bearer ${token}` });

    const { body: schedule } = await request(app)
      .post("/schedules/")
      .send({
        eventName: "Horário da Noite",
        startTime: "2023-06-22T18:30:00.120Z",
        endTime: "2023-06-22T21:30:00.120Z",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).put(`/schedules/${schedule.id}`).set({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY4ODQ5NTg2OSwiZXhwIjoxNjg5NzkxODY5LCJzdWIiOiIyZDdhODNmMi0xMmRlLTQ4NGMtYTBlZi1iODhmODgxNGRmMmQifQ.qwK0gBkNa6GB9VYtFRoni3Whfg_zNiav-EXS8i09deg`,
    });

    expect(response.statusCode).toBe(404);
    expect(response.error.text).toContain("User not found!!");
  });

  it("should throw an error if schedule is not found", async () => {
    const { body: service } = await request(app)
      .post("/services/")
      .send({
        title: "Test Tattoo",
        description: "Test Description",
      })
      .set({ Authorization: `Bearer ${token}` });

    await request(app)
      .put(`/services/${service.id}`)
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .put(`/schedules/fake_schedule_id`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(404);
    expect(response.error.text).toContain("Schedule not found!!");
  });

  it("should throw an error if user was not chosen a service", async () => {
    await request(app).post("/users/").send({
      name: "Test Name",
      email: "exampleTest@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "51992226056",
    });
    const { body: newUserToken } = await request(app)
      .post("/users/auth")
      .send({ email: "exampleTest@example.com", password: "testPassword" });

    const { body: schedule } = await request(app)
      .post("/schedules/")
      .send({
        eventName: "Horário da Noite",
        startTime: "2023-06-22T18:30:00.120Z",
        endTime: "2023-06-22T21:30:00.120Z",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .put(`/schedules/${schedule.id}`)
      .set({ Authorization: `Bearer ${newUserToken}` });

    expect(response.statusCode).toBe(400);
    expect(response.error.text).toContain("User has not chosen a service");
  });
});
