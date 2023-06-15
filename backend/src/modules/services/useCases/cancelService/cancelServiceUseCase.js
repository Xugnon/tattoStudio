const AppError = require("../../../../utils/errors/appError");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");
const PrismaSchedulesRepository = require("../../../schedules/repositories/prismaSchedulesRepository");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaUsersRepository = new PrismaUsersRepository();
const prismaSchedulesRepository = new PrismaSchedulesRepository();
const prismaServicesRepository = new PrismaServicesRepository();

class CancelServiceUseCase {
  constructor() {
    this.usersRepository = prismaUsersRepository;
    this.servicesRepository = prismaServicesRepository;
    this.schedulesRepository = prismaSchedulesRepository;
  }

  async execute({ id_service, id_user }) {
    const user = await this.usersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    // Desassociar o service do user
    await this.servicesRepository.removeUserFromService({ id_service });

    // Encontrando o schedule associado com o user
    const schedule = user.Schedules.find(
      (schedule) => schedule.userId === id_user
    );
    if (!schedule) {
      throw new AppError("Schedule not found!", 404);
    }

    // Desassociar o user e o service do schedule
    await this.schedulesRepository.removeUserServiceFromSchedule({
      id_schedule: schedule.id,
    });

    return;
  }
}

module.exports = CancelServiceUseCase;
