const GetAvailableSchedulesUseCase = require("./getAvailableSchedulesUseCase");
const InMemorySchedulesRepository = require("../../repositories/in-memory/InMemorySchedulesRepository");

describe("Get available schedules useCase", () => {
  let getAvailableSchedulesUseCase;
  let inMemorySchedulesRepository;

  beforeEach(() => {
    inMemorySchedulesRepository = new InMemorySchedulesRepository();
    getAvailableSchedulesUseCase = new GetAvailableSchedulesUseCase(
      inMemorySchedulesRepository
    );
  });

  it("should be able to get available's schedules", async () => {
    await inMemorySchedulesRepository.create({
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    });

    const schedules = await getAvailableSchedulesUseCase.execute();

    expect(schedules).toBeTruthy();
  });
});
