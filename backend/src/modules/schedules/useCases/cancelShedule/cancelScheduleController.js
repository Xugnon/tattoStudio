const CancelScheduleUseCase = require("./cancelScheduleUseCase");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

class CancelScheduleController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_schedule } = req.params;

      const prismaUsersRepository = new PrismaUsersRepository();
      const prismaSchedulesRepository = new PrismaSchedulesRepository();
      const cancelScheduleUseCase = new CancelScheduleUseCase(
        prismaUsersRepository,
        prismaSchedulesRepository
      );

      await cancelScheduleUseCase.execute({ id_schedule, id_user });

      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CancelScheduleController;
