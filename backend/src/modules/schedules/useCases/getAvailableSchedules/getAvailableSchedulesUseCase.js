const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class GetAvailableSchedulesUseCase {
  constructor() {
    this.schedulesRepository = prismaSchedulesRepository;
  }
  async execute() {
    const schedules = await this.schedulesRepository.findMany();

    return schedules;
  }
}

module.exports = GetAvailableSchedulesUseCase;
