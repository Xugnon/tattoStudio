const InsertUserSchedulesUseCase = require("./insertUserSchedulesUseCase");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");
const PrismaServicesRepository = require("../../../services/repositories/prismaServicesRepository");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

class InsertUserSchedulesController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_schedule } = req.params;

      const prismaUsersRepository = new PrismaUsersRepository();
      const prismaServicesRepository = new PrismaServicesRepository();
      const prismaSchedulesRepository = new PrismaSchedulesRepository();
      const insertUserUseCase = new InsertUserSchedulesUseCase(
        prismaUsersRepository,
        prismaServicesRepository,
        prismaSchedulesRepository
      );

      const schedule = await insertUserUseCase.execute({
        id_user,
        id_schedule,
      });

      return res.status(200).json(schedule);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = InsertUserSchedulesController;
