const CreateScheduleUseCase = require("./createScheduleUseCase");
const InMemorySchedulesRepository = require("../../repositories/in-memory/InMemorySchedulesRepository");

describe("Create schedule useCase", () => {
  let createScheduleUseCase;
  let inMemorySchedulesRepository;

  beforeEach(() => {
    inMemorySchedulesRepository = new InMemorySchedulesRepository();
    createScheduleUseCase = new CreateScheduleUseCase(
      inMemorySchedulesRepository
    );
  });

  it("should be able to create a new Schedule", async () => {
    const schedule = {
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    };

    const createdSchedule = await createScheduleUseCase.execute(schedule);

    expect(createdSchedule).toHaveProperty("id");
  });
});
