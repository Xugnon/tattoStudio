const CreateScheduleUseCase = require("./createScheduleUseCase");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

class CreateScheduleController {
  async handle(req, res) {
    try {
      const { eventName, startTime, endTime } = req.body;

      const prismaSchedulesRepository = new PrismaSchedulesRepository();
      const createScheduleUseCase = new CreateScheduleUseCase(
        prismaSchedulesRepository
      );

      const schedule = await createScheduleUseCase.execute({
        eventName,
        startTime,
        endTime,
      });

      return res.status(201).json(schedule);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CreateScheduleController;
