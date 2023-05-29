const InsertUserServiceUseCase = require("./insertUserServiceUseCase");

class InsertUserServiceController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_service } = req.params;

      const insertUserServiceUseCase = new InsertUserServiceUseCase();

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
