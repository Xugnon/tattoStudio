const CancelServiceUseCase = require("./cancelServiceUseCase");
const InMemoryUsersRepository = require("../../../users/repositories/in-memory/InMemoryUsersRepository");
const InMemoryServicesRepository = require("../../repositories/in-memory/InMemoryServicesRepository");
const InMemorySchedulesRepository = require("../../../schedules/repositories/in-memory/InMemorySchedulesRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Cancel service useCase", () => {
  let cancelServiceUseCase;
  let inMemoryUsersRepository;
  let inMemoryServicesRepository;
  let inMemorySchedulesRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemorySchedulesRepository = new InMemorySchedulesRepository();
    cancelServiceUseCase = new CancelServiceUseCase(
      inMemoryUsersRepository,
      inMemoryServicesRepository,
      inMemorySchedulesRepository
    );
  });

  it("should be able to cancel a service and remove the user from the service and schedule", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Test Name",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    });

    const service = await inMemoryServicesRepository.create({
      title: "test",
      description: "test",
    });

    const schedule = await inMemorySchedulesRepository.create({
      eventName: "Hr Manha",
      startTime: "7h",
      endTime: "11h",
    });

    await inMemoryServicesRepository.insertUser({
      id_service: service.id,
      id_user: user.id,
    });
    user.Services.push({ id: service.id, userId: user.id });

    await inMemorySchedulesRepository.insertUserAndService({
      id_schedule: schedule.id,
      id_service: service.id,
      id_user: user.id,
    });
    user.Schedules.push({ id: schedule.id, userId: user.id });

    await cancelServiceUseCase.execute({
      id_service: service.id,
      id_user: user.id,
    });

    const updatedService = await inMemoryServicesRepository.findById({
      id_service: service.id,
    });
    expect(updatedService.userId).not.toBe(user.id);

    const updatedSchedule = await inMemorySchedulesRepository.findById({
      id_schedule: schedule.id,
    });
    expect(updatedSchedule.userId).not.toBe(user.id);
    expect(updatedSchedule.servicesId).not.toBe(service.id);
  });

  it("should throw an error if user is not found", async () => {
    const service = await inMemoryServicesRepository.create({
      title: "test",
      description: "test",
    });

    await expect(
      cancelServiceUseCase.execute({
        id_user: "invalid_id_user",
        id_service: service.id,
      })
    ).rejects.toEqual(new AppError("User not found!", 404));
  });

  it("should throw an error if service is not found", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Test Name",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    });

    await expect(
      cancelServiceUseCase.execute({
        id_user: user.id,
        id_service: "invalid_id_service",
      })
    ).rejects.toEqual(new AppError("Service not found!", 404));
  });
});
