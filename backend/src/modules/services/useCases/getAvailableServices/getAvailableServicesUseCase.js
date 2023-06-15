const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaServicesRepository = new PrismaServicesRepository();

class GetAvailableServicesUseCase {
  constructor() {
    this.servicesRepository = prismaServicesRepository;
  }

  async execute() {
    const services = await this.servicesRepository.findMany();

    return services;
  }
}

module.exports = GetAvailableServicesUseCase;
