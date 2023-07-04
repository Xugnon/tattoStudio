const InsertUserServiceUseCase = require("./insertUserServiceUseCase");
const PrismaUsersRepository = require("../../../users/repositories/prismaUsersRepository");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

class InsertUserServiceController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_service } = req.params;

      const prismaUsersRepository = new PrismaUsersRepository();
      const prismaServicesRepository = new PrismaServicesRepository();
      const insertUserServiceUseCase = new InsertUserServiceUseCase(
        prismaUsersRepository,
        prismaServicesRepository
      );

      const service = await insertUserServiceUseCase.execute({
        id_user,
        id_service,
      });

      return res.status(200).json(service);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = InsertUserServiceController;
