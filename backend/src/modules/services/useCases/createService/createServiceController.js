const CreateServiceUseCase = require("./createServiceUseCase");

class CreateServiceController {
  async handle(req, res) {
    const { title, description } = req.body;

    const createServiceUseCase = new CreateServiceUseCase();

    const service = await createServiceUseCase.execute({ title, description });

    return res.status(201).json(service);
  }
}

module.exports = CreateServiceController;
