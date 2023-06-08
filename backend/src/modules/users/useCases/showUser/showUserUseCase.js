const AppError = require("../../../../utils/errors/appError");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

const prismaUsersRepository = new PrismaUsersRepository();

class ShowUserUseCase {
  async execute({ id_user }) {
    const user = await prismaUsersRepository.findById({ id_user });

    if (!user) {
      throw new AppError("User not found!!", 404);
    } else {
      return user;
    }
  }
}

module.exports = ShowUserUseCase;
