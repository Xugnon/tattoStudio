const CreateServiceUseCase = require("./createServiceUseCase");

class CreateServiceController {
  async handle(req, res) {
    try {
      const { title, description } = req.body;

      const createServiceUseCase = new CreateServiceUseCase();

      const service = await createServiceUseCase.execute({
        title,
        description,
      });

      return res.status(201).json(service);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

module.exports = CreateServiceController;
