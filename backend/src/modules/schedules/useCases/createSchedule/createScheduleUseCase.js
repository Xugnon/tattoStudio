class CreateScheduleUseCase {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository;
  }
  async execute({ eventName, startTime, endTime }) {
    const schedule = await this.schedulesRepository.create({
      eventName,
      startTime,
      endTime,
    });

    return schedule;
  }
}

module.exports = CreateScheduleUseCase;
