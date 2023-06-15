const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class CreateScheduleUseCase {
  constructor() {
    this.schedulesRepository = prismaSchedulesRepository;
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
