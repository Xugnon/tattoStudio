const { compare } = require("bcryptjs");
const AppError = require("../../../../utils/errors/appError");
const { sign } = require("jsonwebtoken");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

const prismaUsersRepository = new PrismaUsersRepository();

class AuthenticateUserUseCase {
  async execute({ email, password }) {
    const user = await prismaUsersRepository.findByEmail({ email });
    if (!user) {
      throw new AppError("Email or Password invalid!!", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or Password invalid!!", 401);
    } else {
      const token = sign({ email }, process.env.SECRET_USER, {
        subject: user.id,
        expiresIn: "15d",
      });

      return token;
    }
  }
}

module.exports = AuthenticateUserUseCase;
