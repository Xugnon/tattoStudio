const DeleteScheduleUseCase = require("./deleteScheduleUseCase");
const InMemorySchedulesRepository = require("../../repositories/in-memory/InMemorySchedulesRepository");

describe("Delete schedule useCase", () => {
  let deleteScheduleUseCase;
  let inMemorySchedulesRepository;

  beforeEach(() => {
    inMemorySchedulesRepository = new InMemorySchedulesRepository();
    deleteScheduleUseCase = new DeleteScheduleUseCase(
      inMemorySchedulesRepository
    );
  });

  it("should be able to delete a schedule", async () => {
    const schedule = await inMemorySchedulesRepository.create({
      eventName: "Horário da Noite",
      startTime: "2023-06-22T18:30:00.120Z",
      endTime: "2023-06-22T21:30:00.120Z",
    });

    await deleteScheduleUseCase.execute({ id: schedule.id });

    const deletedSchedule = await inMemorySchedulesRepository.findById(
      schedule.id
    );

    expect(deletedSchedule).not.toBeTruthy();
  });
});
