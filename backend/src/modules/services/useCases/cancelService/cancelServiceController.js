const CancelServiceUseCase = require("./cancelServiceUseCase");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");
const PrismaSchedulesRepository = require("../../../schedules/repositories/prismaSchedulesRepository");

class CancelServiceController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_service } = req.params;

      const prismaUsersRepository = new PrismaUsersRepository();
      const prismaServicesRepository = new PrismaServicesRepository();
      const prismaSchedulesRepository = new PrismaSchedulesRepository();
      const cancelServiceUseCase = new CancelServiceUseCase(
        prismaUsersRepository,
        prismaServicesRepository,
        prismaSchedulesRepository
      );

      await cancelServiceUseCase.execute({
        id_service,
        id_user,
      });

      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CancelServiceController;
