const DeleteServiceUseCase = require("./deleteServiceUseCase");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

class DeleteServiceController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const prismaServicesRepository = new PrismaServicesRepository();
      const deleteServiceUseCase = new DeleteServiceUseCase(
        prismaServicesRepository
      );

      await deleteServiceUseCase.execute({ id });

      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = DeleteServiceController;
