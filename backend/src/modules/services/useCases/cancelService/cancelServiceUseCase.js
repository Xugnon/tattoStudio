const AppError = require("../../../../utils/errors/appError");

class CancelServiceUseCase {
  constructor(usersRepository, servicesRepository, schedulesRepository) {
    this.usersRepository = usersRepository;
    this.servicesRepository = servicesRepository;
    this.schedulesRepository = schedulesRepository;
  }

  async execute({ id_service, id_user }) {
    const user = await this.usersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    const service = await this.servicesRepository.findById({ id_service });
    if (!service) {
      throw new AppError("Service not found!", 404);
    }
    await this.servicesRepository.removeUserFromService({
      id_service: service.id,
    });

    const schedule = user.Schedules.find(
      (schedule) => schedule.userId === id_user
    );
    if (!schedule) {
      return;
    }

    await this.schedulesRepository.removeUserServiceFromSchedule({
      id_schedule: schedule.id,
    });

    return;
  }
}

module.exports = CancelServiceUseCase;
