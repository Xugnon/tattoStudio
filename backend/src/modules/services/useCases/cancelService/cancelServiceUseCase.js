const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/errors/appError");

class CancelServiceUseCase {
  async execute({ id_service, id_user }) {
    const user = await prisma.users.findUnique({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    const service = await prisma.services.update({
      where: {
        id: id_service,
      },
      data: {
        userId: null,
      },
    });

    if (!service) {
      throw new AppError("Service not found!!", 404);
    }

    return service;
  }
}

module.exports = CancelServiceUseCase;
