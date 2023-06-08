const PrismaServicesRepository = require("../../repositories/prismaServicesRepository");

const prismaServicesRepository = new PrismaServicesRepository();

class DeleteServiceUseCase {
  async execute({ id }) {
    await prismaServicesRepository.deleteById({ id });

    return;
  }
}

module.exports = DeleteServiceUseCase;
