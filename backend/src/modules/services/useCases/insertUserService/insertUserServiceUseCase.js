const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/errors/appError");

class InsertUserServiceUseCase {
  async execute({ id_user, id_service }) {
    const user = await prisma.users.findUnique({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    const idService = await prisma.services.findUnique({
      where: {
        id: id_service,
      },
    });
    if (!idService) {
      throw new AppError("Service not found!!", 404);
    }

    const service = await prisma.services.update({
      where: {
        id: idService.id,
      },
      data: {
        userId: user.id,
      },
    });

    return service;
  }
}

module.exports = InsertUserServiceUseCase;
