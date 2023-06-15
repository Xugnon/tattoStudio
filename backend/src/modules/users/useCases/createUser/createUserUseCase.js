const AppError = require("../../../../utils/errors/appError");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

const prismaUsersRepository = new PrismaUsersRepository();

class CreateUserUseCase {
  constructor() {
    this.usersRepository = prismaUsersRepository;
  }

  async execute({ name, email, password, address, pessoal_number }) {
    const user = await this.usersRepository.findByEmailOrNumber({
      email,
      pessoal_number,
    });

    if (!user) {
      const newUser = await this.usersRepository.create({
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
