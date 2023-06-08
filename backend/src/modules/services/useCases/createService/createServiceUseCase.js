const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaServicesRepository = new PrismaServicesRepository();

class CreateServiceUseCase {
  async execute({ title, description }) {
    const service = await prismaServicesRepository.create({
      title,
      description,
    });

    return service;
  }
}

module.exports = CreateServiceUseCase;
