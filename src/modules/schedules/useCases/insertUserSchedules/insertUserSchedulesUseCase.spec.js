const InsertUserSchedulesUseCase = require("./insertUserSchedulesUseCase");
const InMemoryUsersRepository = require("../../../users/repositories/in-memory/InMemoryUsersRepository");
const InMemoryServicesRepository = require("../../../services/repositories/in-memory/InMemoryServicesRepository");
const InMemorySchedulesRepository = require("../../repositories/in-memory/InMemorySchedulesRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Insert user schedules useCase", () => {
  let insertUserSchedulesUseCase;
  let inMemoryUsersRepository;
  let inMemoryServicesRepository;
  let inMemorySchedulesRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemorySchedulesRepository = new InMemorySchedulesRepository();
    insertUserSchedulesUseCase = new InsertUserSchedulesUseCase(
      inMemoryUsersRepository,
      inMemoryServicesRepository,
      inMemorySchedulesRepository
    );
  });

  it("should be able to insert a user schedule", async () => {
    const { id: id_user } = await inMemoryUsersRepository.create({
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    });

    const { id: id_service } = await inMemoryServicesRepository.create({
      title: "test",
      description: "test",
    });

    await inMemoryServicesRepository.insertUser({ id_service, id_user });

    const { id: id_schedule } = await inMemorySchedulesRepository.create({
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    });

    const schedule = await insertUserSchedulesUseCase.execute({
      id_schedule,
      id_user,
    });

    expect(schedule.servicesId).toBe(id_service);
    expect(schedule.userId).toBe(id_user);
  });

  it("should throw an error if user is not found", async () => {
    const { id: id_schedule } = await inMemorySchedulesRepository.create({
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    });

    const schedule = {
      id_schedule: id_schedule,
      id_user: "fake_id_user",
    };

    await expect(insertUserSchedulesUseCase.execute(schedule)).rejects.toEqual(
      new AppError("User not found!!", 404)
    );
  });

  it("should throw an error if schedule is not found", async () => {
    const { id: id_user } = await inMemoryUsersRepository.create({
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    });

    const schedule = {
      id_schedule: "fake_id_schedule",
      id_user,
    };

    await expect(insertUserSchedulesUseCase.execute(schedule)).rejects.toEqual(
      new AppError("Schedule not found!!", 404)
    );
  });

  it("should throw an error if user was not chosen a service", async () => {
    const { id: id_user } = await inMemoryUsersRepository.create({
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    });

    const { id: id_schedule } = await inMemorySchedulesRepository.create({
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    });

    await expect(
      insertUserSchedulesUseCase.execute({ id_schedule, id_user })
    ).rejects.toEqual(new AppError("User has not chosen a service", 400));
  });
});
