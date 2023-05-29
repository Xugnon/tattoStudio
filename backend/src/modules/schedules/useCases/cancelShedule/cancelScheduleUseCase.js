const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/errors/appError");

class CancelScheduleUseCase {
  async execute({ id_schedule, id_user }) {
    const user = await prisma.users.findUnique({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    await prisma.schedules.update({
      where: {
        id: id_schedule,
      },
      data: {
        userId: null,
      },
    });

    return;
  }
}

module.exports = CancelScheduleUseCase;
