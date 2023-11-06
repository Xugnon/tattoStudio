const AppError = require("../../../../utils/errors/appError");

class InsertUserSchedulesUseCase {
  constructor(usersRepository, servicesRepository, schedulesRepository) {
    this.usersRepository = usersRepository;
    this.servicesRepository = servicesRepository;
    this.schedulesRepository = schedulesRepository;
  }

  async execute({ id_user, id_schedule }) {
    const user = await this.usersRepository.findById({ id_user });

    const schedule = await this.schedulesRepository.findById({ id_schedule });

    const service = await this.servicesRepository.findByUserId({ id_user });

    if (!user) {
      throw new AppError("User not found!!", 404);
    } else if (!schedule) {
      throw new AppError("Schedule not found!!", 404);
    } else if (!service) {
      throw new AppError("User has not chosen a service", 400);
    } else {
      const newSchedule = await this.schedulesRepository.insertUserAndService({
        id_schedule: schedule.id,
        id_user: user.id,
        id_service: service.id,
      });

      return newSchedule;
    }
  }
}

module.exports = InsertUserSchedulesUseCase;
