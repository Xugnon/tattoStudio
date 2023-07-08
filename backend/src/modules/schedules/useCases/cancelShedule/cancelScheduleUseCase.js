const AppError = require("../../../../utils/errors/appError");

class CancelScheduleUseCase {
  constructor(usersRepository, schedulesRepository) {
    this.usersRepository = usersRepository;
    this.schedulesRepository = schedulesRepository;
  }
  async execute({ id_schedule, id_user }) {
    const user = await this.usersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    const schedule = await this.schedulesRepository.findById({ id_schedule });
    if (!schedule) {
      throw new AppError("Schedule not found!!", 404);
    }
    await this.schedulesRepository.removeUserSchedule({ id_schedule });

    return;
  }
}

module.exports = CancelScheduleUseCase;
