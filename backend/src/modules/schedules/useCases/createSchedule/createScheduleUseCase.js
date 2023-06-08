const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class CreateScheduleUseCase {
  async execute({ eventName, startTime, endTime }) {
    const schedule = await prismaSchedulesRepository.create({
      eventName,
      startTime,
      endTime,
    });

    return schedule;
  }
}

module.exports = CreateScheduleUseCase;
