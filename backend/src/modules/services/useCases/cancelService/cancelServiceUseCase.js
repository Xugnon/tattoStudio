const AppError = require("../../../../utils/errors/appError");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");
const PrismaSchedulesRepository = require("../../../schedules/repositories/prismaSchedulesRepository");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaUsersRepository = new PrismaUsersRepository();
const prismaSchedulesRepository = new PrismaSchedulesRepository();
const prismaServicesRepository = new PrismaServicesRepository();

class CancelServiceUseCase {
  async execute({ id_service, id_user }) {
    const user = await prismaUsersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    // Desassociar o service do user
    await prismaServicesRepository.removeUserFromService({ id_service });

    // Encontrando o schedule associado com o user
    const schedule = user.Schedules.find(
      (schedule) => schedule.userId === id_user
    );
    if (!schedule) {
      throw new AppError("Schedule not found!", 404);
    }

    // Desassociar o user e o service do schedule
    await prismaSchedulesRepository.removeUserServiceFromSchedule({
      id_schedule: schedule.id,
    });

    return;
  }
}

module.exports = CancelServiceUseCase;
