const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class DeleteScheduleUseCase {
  constructor() {
    this.schedulesRepository = prismaSchedulesRepository;
  }
  async execute({ id }) {
    await this.schedulesRepository.deleteById({ id });

    return;
  }
}

module.exports = DeleteScheduleUseCase;
