const GetAvailableSchedulesUseCase = require("./getAvailableSchedulesUseCase");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

class GetAvailableSchedulesController {
  async handle(req, res) {
    try {
      const prismaSchedulesRepository = new PrismaSchedulesRepository();
      const getAvailableSchedulesUseCase = new GetAvailableSchedulesUseCase(
        prismaSchedulesRepository
      );

      const schedules = await getAvailableSchedulesUseCase.execute();

      return res.status(201).json(schedules);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = GetAvailableSchedulesController;
