const GetAvailableServicesUseCase = require("./getAvailableServicesUseCase");
const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

class GetAvailableServicesController {
  async handle(req, res) {
    try {
      const prismaServicesRepository = new PrismaServicesRepository();
      const getAvailableServicesUseCase = new GetAvailableServicesUseCase(
        prismaServicesRepository
      );

      const services = await getAvailableServicesUseCase.execute();

      const servicesResponse = {
        id: services.id,
        title: services.title,
        description: services.description,
      };

      return res.status(201).json(services);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

module.exports = GetAvailableServicesController;
