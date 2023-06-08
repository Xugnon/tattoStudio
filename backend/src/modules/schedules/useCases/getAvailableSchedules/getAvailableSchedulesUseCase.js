const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class GetAvailableSchedulesUseCase {
  async execute() {
    const schedules = await prismaSchedulesRepository.findMany();

    return schedules;
  }
}

module.exports = GetAvailableSchedulesUseCase;
