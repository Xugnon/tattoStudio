const prisma = require("../../../database/prismaClient");

class PrismaServicesRepository {
  async create({ title, description }) {
    const service = await prisma.services.create({
      data: {
        title,
        description,
      },
    });

    return service;
  }

  async findMany() {
    const services = prisma.services.findMany({
      where: {
        userId: null,
      },
    });

    return services;
  }

  async findById({ id_service }) {
    const service = await prisma.services.findUnique({
      where: {
        id: id_service,
      },
    });

    return service;
  }

  async insertUser({ id_service, id_user }) {
    const service = await prisma.services.update({
      where: {
        id: id_service,
      },
      data: {
        userId: id_user,
      },
    });

    return service;
  }

  async removeUserFromService({ id_service }) {
    await prisma.services.update({
      where: {
        id: id_service,
      },
      data: {
        userId: null,
      },
    });
  }

  async deleteById({ id }) {
    await prisma.services.delete({
      where: {
        id,
      },
    });

    return;
  }
}

module.exports = PrismaServicesRepository;
