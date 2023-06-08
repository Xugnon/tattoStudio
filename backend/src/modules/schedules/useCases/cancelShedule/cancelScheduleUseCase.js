const AppError = require("../../../../utils/errors/appError");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");

const prismaSchedulesRepository = new PrismaSchedulesRepository();
const prismaUsersRepository = new PrismaUsersRepository();

class CancelScheduleUseCase {
  async execute({ id_schedule, id_user }) {
    const user = await prismaUsersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    await prismaSchedulesRepository.removeUserSchedule({ id_schedule });

    return;
  }
}

module.exports = CancelScheduleUseCase;
