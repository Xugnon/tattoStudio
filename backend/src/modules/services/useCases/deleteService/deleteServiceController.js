const DeleteServiceUseCase = require("./deleteServiceUseCase");

class DeleteServiceController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const deleteServiceUseCase = new DeleteServiceUseCase();

      await deleteServiceUseCase.execute({ id });

      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = DeleteServiceController;
