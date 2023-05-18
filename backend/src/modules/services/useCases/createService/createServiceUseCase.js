const prisma = require("../../../../database/prismaClient");

class CreateServiceUseCase {
  async execute({ title, description }) {
    const service = await prisma.services.create({
      data: {
        title,
        description,
      },
    });

    return service;
  }
}

module.exports = CreateServiceUseCase;
