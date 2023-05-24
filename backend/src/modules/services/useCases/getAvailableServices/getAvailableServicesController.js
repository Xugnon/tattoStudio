const GetAvailableServicesUseCase = require("./getAvailableServicesUseCase");

class GetAvailableServicesController {
  async handle(req, res) {
    try {
      const getAvailableServicesUseCase = new GetAvailableServicesUseCase();

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
