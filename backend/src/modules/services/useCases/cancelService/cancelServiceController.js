const CancelServiceUseCase = require("./cancelServiceUseCase");

class CancelServiceController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_service } = req.params;

      const cancelServiceUseCase = new CancelServiceUseCase();

      const service = await cancelServiceUseCase.execute({
        id_service,
        id_user,
      });

      return res.status(201).json(service);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CancelServiceController;
