const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/errors/appError");

class ShowUserUseCase {
  async execute({ id_user }) {
    const user = await prisma.users.findFirst({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      throw new AppError("User not found!!", 404);
    } else {
      return user;
    }
  }
}

module.exports = ShowUserUseCase;
