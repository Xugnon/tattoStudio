const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/errors/appError");

class GetAvailableServicesUseCase {
  async execute() {
    const services = await prisma.services.findMany({
      where: {
        userId: null,
      },
    });

    return services;
  }
}

module.exports = GetAvailableServicesUseCase;
