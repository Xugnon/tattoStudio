const prisma = require("../../../../database/prismaClient");
const { compare } = require("bcryptjs");
const AppError = require("../../../../utils/errors/appError");
const { sign } = require("jsonwebtoken");

class AuthenticateUserUseCase {
  async execute({ email, password }) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    const passwordMatch = await compare(password, user.password);

    if (!user || !passwordMatch) {
      throw new AppError("Email or Password invalid!!", 401);
    } else {
      const token = sign({ email }, process.env.SECRET_STUDENT, {
        subject: user.id,
        expiresIn: "15d",
      });

      return token;
    }
  }
}

module.exports = AuthenticateUserUseCase;
