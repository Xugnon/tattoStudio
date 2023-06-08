const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class DeleteScheduleUseCase {
  async execute({ id }) {
    await prismaSchedulesRepository.delete({ id });

    return;
  }
}

module.exports = DeleteScheduleUseCase;
