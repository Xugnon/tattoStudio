const DeleteScheduleUseCase = require("./deleteScheduleUseCase");

class DeleteScheduleController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const deleteScheduleUseCase = new DeleteScheduleUseCase();

      await deleteScheduleUseCase.execute({ id });

      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = DeleteScheduleController;
