const prisma = require("../../../../database/prismaClient");

class GetAvailableSchedulesUseCase {
  async execute() {
    const schedules = await prisma.schedules.findMany({
      where: {
        userId: null,
        servicesId: null,
      },
    });

    return schedules;
  }
}

module.exports = GetAvailableSchedulesUseCase;
