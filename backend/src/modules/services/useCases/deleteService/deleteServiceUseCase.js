const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaServicesRepository = new PrismaServicesRepository();

class DeleteServiceUseCase {
  constructor() {
    this.servicesRepository = prismaServicesRepository;
  }

  async execute({ id }) {
    await this.servicesRepository.deleteById({ id });

    return;
  }
}

module.exports = DeleteServiceUseCase;
