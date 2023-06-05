const prisma = require("../../../../database/prismaClient");

class DeleteScheduleUseCase {
  async execute({ id }) {
    await prisma.schedules.delete({
      where: {
        id,
      },
    });

    return;
  }
}

module.exports = DeleteScheduleUseCase;
