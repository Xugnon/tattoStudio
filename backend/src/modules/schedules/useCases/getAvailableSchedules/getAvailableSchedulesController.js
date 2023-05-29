const GetAvailableSchedulesUseCase = require("./getAvailableSchedulesUseCase");

class GetAvailableSchedulesController {
  async handle(req, res) {
    try {
      const getAvailableSchedulesUseCase = new GetAvailableSchedulesUseCase();

      const schedules = await getAvailableSchedulesUseCase.execute();

      return res.status(201).json(schedules);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = GetAvailableSchedulesController;
