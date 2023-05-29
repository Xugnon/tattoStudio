const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/errors/appError");

class CancelServiceUseCase {
  async execute({ id_service, id_user }) {
    const user = await prisma.users.findUnique({
      where: {
        id: id_user,
      },
      include: {
        Schedules: true,
      },
    });
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    // Desassociar o service do user
    await prisma.services.update({
      where: {
        id: id_service,
      },
      data: {
        userId: null,
      },
    });

    // Encontrando o schedule associado com o user
    const schedule = user.Schedules.find(
      (schedule) => schedule.userId === id_user
    );
    if (!schedule) {
      throw new AppError("Schedule not found!", 404);
    }

    // Desassociar o user e o service do schedule
    await prisma.schedules.update({
      where: {
        id: schedule.id,
      },
      data: {
        servicesId: null,
        userId: null,
      },
    });

    return;
  }
}

module.exports = CancelServiceUseCase;
