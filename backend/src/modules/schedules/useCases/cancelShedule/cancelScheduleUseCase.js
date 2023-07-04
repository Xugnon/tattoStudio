const AppError = require("../../../../utils/errors/appError");

class CancelScheduleUseCase {
  constructor(usersRepository, schedulesRepository) {
    this.usersRepository = usersRepository;
    this.schedulesRepository = schedulesRepository;
  }
  async execute({ id_schedule, id_user }) {
    const user = await this.prismaUsersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    await this.schedulesRepository.removeUserSchedule({ id_schedule });

    return;
  }
}

module.exports = CancelScheduleUseCase;
