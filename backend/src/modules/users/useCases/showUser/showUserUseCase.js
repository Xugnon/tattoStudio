const AppError = require("../../../../utils/errors/appError");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

const prismaUsersRepository = new PrismaUsersRepository();

class ShowUserUseCase {
  constructor() {
    this.usersRepository = prismaUsersRepository;
  }

  async execute({ id_user }) {
    const user = await this.usersRepository.findById({ id_user });

    if (!user) {
      throw new AppError("User not found!!", 404);
    } else {
      return user;
    }
  }
}

module.exports = ShowUserUseCase;
