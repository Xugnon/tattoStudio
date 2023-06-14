const prisma = require("../../../database/prismaClient");

class PrismaSchedulesRepository {
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

  async findById({ id_schedule }) {
    const schedule = await prisma.schedules.findUnique({
      where: {
        id: id_schedule,
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

  async insertUserAndService({ id_schedule, id_user, id_service }) {
    const newSchedule = await prisma.schedules.update({
      where: {
        id: id_schedule,
      },
      data: {
        userId: id_user,
        servicesId: id_service,
      },
    });

    return newSchedule;
  }

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

  async deleteById({ id }) {
    await prisma.schedules.delete({
      where: {
        id,
      },
    });

    return;
  }
}

module.exports = PrismaSchedulesRepository;
