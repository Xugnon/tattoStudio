const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaServicesRepository = new PrismaServicesRepository();

class GetAvailableServicesUseCase {
  async execute() {
    const services = await prismaServicesRepository.findMany();

    return services;
  }
}

module.exports = GetAvailableServicesUseCase;
