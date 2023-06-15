const AppError = require("../../../../utils/errors/appError");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();
const prismaUsersRepository = new PrismaUsersRepository();

class CancelScheduleUseCase {
  constructor() {
    this.prismaUsersRepository = prismaUsersRepository;
    this.schedulesRepository = prismaSchedulesRepository;
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
