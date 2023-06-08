const AppError = require("../../../../utils/errors/appError");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

const prismaUsersRepository = new PrismaUsersRepository();

class CreateUserUseCase {
  async execute({ name, email, password, address, pessoal_number }) {
    const user = await prismaUsersRepository.findByEmailOrNumber({
      email,
      pessoal_number,
    });

    if (!user) {
      const newUser = await prismaUsersRepository.create({
        name,
        email,
        password,
        address,
        pessoal_number,
      });

      return newUser;
    } else {
      throw new AppError("Email or Number already in use!!", 409);
    }
  }
}

module.exports = CreateUserUseCase;
