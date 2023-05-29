const prisma = require("../../../../database/prismaClient");

class CreateScheduleUseCase {
  async execute({ eventName, startTime, endTime }) {
    const schedule = await prisma.schedules.create({
      data: {
        eventName,
        startTime,
        endTime,
      },
    });

    return schedule;
  }
}

module.exports = CreateScheduleUseCase;
