const prisma = require("../../../database/prismaClient");

class PrismaSchedulesRepository {
  async removeUserServiceFromSchedule({ id_schedule }) {
    await prisma.schedules.update({
      where: {
        id: id_schedule,
      },
      data: {
        servicesId: null,
        userId: null,
      },
    });
  }

  async create({ eventName, startTime, endTime }) {
    const schedule = await prisma.schedules.create({
      data: {
        eventName,
        startTime,
        endTime,
      },
    });

    return schedule;
  }

  async findMany() {
    const schedules = await prisma.schedules.findMany({
      where: {
        userId: null,
        servicesId: null,
      },
    });

    return schedules;
  }

  async delete({ id }) {
    await prisma.schedules.delete({
      where: {
        id,
      },
    });

    return;
  }

  async removeUserSchedule({ id_schedule }) {
    await prisma.schedules.update({
      where: {
        id: id_schedule,
      },
      data: {
        userId: null,
      },
    });

    return;
  }
}

module.exports = PrismaSchedulesRepository;
