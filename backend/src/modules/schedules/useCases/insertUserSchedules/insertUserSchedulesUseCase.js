const AppError = require("../../../../utils/errors/appError");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();

class InsertUserSchedulesUseCase {
  async execute({ id_user, id_schedule }) {
    const user = await prisma.users.findUnique({
      where: {
        id: id_user,
      },
    });

    const schedule = await prisma.schedules.findUnique({
      where: {
        id: id_schedule,
      },
    });

    const service = await prisma.services.findFirst({
      where: {
        userId: id_user,
      },
    });

    if (!user) {
      throw new AppError("User not found!!", 404);
    } else if (!schedule) {
      throw new AppError("Schedule not found!!", 404);
    } else if (!service) {
      throw new AppError("User has not chosen a service", 400);
    } else {
      const newSchedule = await prisma.schedules.update({
        where: {
          id: schedule.id,
        },
        data: {
          userId: user.id,
          servicesId: service.id,
        },
      });

      return newSchedule;
    }
  }
}

module.exports = InsertUserSchedulesUseCase;
