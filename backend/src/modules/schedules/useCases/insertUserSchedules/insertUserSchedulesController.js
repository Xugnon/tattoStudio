const InsertUserSchedulesUseCase = require("./insertUserSchedulesUseCase");

class InsertUserSchedulesController {
  async handle(req, res) {
    try {
      const { id_user } = req;
      const { id: id_schedule } = req.params;

      const insertUserUseCase = new InsertUserSchedulesUseCase();

      const schedule = await insertUserUseCase.execute({
        id_user,
        id_schedule,
      });

      return res.status(200).json(schedule);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = InsertUserSchedulesController;
