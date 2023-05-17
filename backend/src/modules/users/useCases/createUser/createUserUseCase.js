const prisma = require("../../../../database/prismaClient");
const { hash } = require("bcryptjs");
const AppError = require("../../../../utils/errors/appError");

class CreateUserUseCase {
  async execute({ name, email, password, address, pessoal_number }) {
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { pessoal_number }],
      },
    });

    if (!user) {
      const hashPassword = await hash(password, 5);

      const newUser = await prisma.users.create({
        data: {
          name,
          email,
          password: hashPassword,
          address,
          pessoal_number,
        },
      });

      return newUser;
    } else {
      throw new AppError("Email or Number already in use!!", 409);
    }
  }
}

module.exports = CreateUserUseCase;
