const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaServicesRepository = new PrismaServicesRepository();

class CreateServiceUseCase {
  constructor() {
    this.servicesRepository = prismaServicesRepository;
  }

  async execute({ title, description }) {
    const service = await this.servicesRepository.create({
      title,
      description,
    });

    return service;
  }
}

module.exports = CreateServiceUseCase;
