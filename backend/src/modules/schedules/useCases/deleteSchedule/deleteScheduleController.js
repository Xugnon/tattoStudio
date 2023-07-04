const DeleteScheduleUseCase = require("./deleteScheduleUseCase");
const PrismaSchedulesRepository = require("../../repositories/prismaSchedulesRepository");

class DeleteScheduleController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const prismaSchedulesRepository = new PrismaSchedulesRepository();
      const deleteScheduleUseCase = new DeleteScheduleUseCase(
        prismaSchedulesRepository
      );

      await deleteScheduleUseCase.execute({ id });

      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = DeleteScheduleController;
