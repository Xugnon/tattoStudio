const CancelScheduleUseCase = require("./cancelScheduleUseCase");
const InMemoryUsersRepository = require("../../../users/repositories/in-memory/InMemoryUsersRepository");
const InMemorySchedulesRepository = require("../../repositories/in-memory/InMemorySchedulesRepository");
const InMemoryServiceRepository = require("../../../services/repositories/in-memory/InMemoryServicesRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Cancel schedule useCase", () => {
  let cancelScheduleUseCase;
  let inMemoryUsersRepository;
  let inMemorySchedulesRepository;
  let inMemoryServicesRepository;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServiceRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemorySchedulesRepository = new InMemorySchedulesRepository();
    cancelScheduleUseCase = new CancelScheduleUseCase(
      inMemoryUsersRepository,
      inMemorySchedulesRepository
    );
  });

  it("should be able to cancel a schedule", async () => {
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

    await inMemorySchedulesRepository.insertUserAndService({
      id_schedule,
      id_user,
      id_service,
    });

    await cancelScheduleUseCase.execute({ id_schedule, id_user });

    const updatedSchedule = await inMemorySchedulesRepository.findById({
      id_schedule,
    });
    expect(updatedSchedule.userId).not.toBe(id_user);
  });

  it("should be throw an error if user is not found", async () => {
    const { id: id_schedule } = await inMemorySchedulesRepository.create({
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    });

    await expect(
      cancelScheduleUseCase.execute({
        id_schedule,
        id_user: "fake_id_user",
      })
    ).rejects.toEqual(new AppError("User not found!!", 404));
  });

  it("should be thrown an error if schedule is not found", async () => {
    const { id: id_user } = await inMemoryUsersRepository.create({
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    });

    await expect(
      cancelScheduleUseCase.execute({
        id_schedule: "fake_id_schedule",
        id_user,
      })
    ).rejects.toEqual(new AppError("Schedule not found!!", 404));
  });
});
