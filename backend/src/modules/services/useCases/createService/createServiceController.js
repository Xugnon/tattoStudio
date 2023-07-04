const CreateServiceUseCase = require("./createServiceUseCase");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

class CreateServiceController {
  async handle(req, res) {
    try {
      const { title, description } = req.body;

      const prismaServicesRepository = new PrismaServicesRepository();
      const createServiceUseCase = new CreateServiceUseCase(
        prismaServicesRepository
      );

      const service = await createServiceUseCase.execute({
        title,
        description,
      });

      return res.status(200).json(service);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CreateServiceController;
