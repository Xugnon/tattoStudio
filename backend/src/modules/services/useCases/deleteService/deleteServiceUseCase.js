const prisma = require("../../../../database/prismaClient");

class DeleteServiceUseCase {
  async execute({ id }) {
    await prisma.services.delete({
      where: {
        id,
      },
    });

    return;
  }
}

module.exports = DeleteServiceUseCase;
