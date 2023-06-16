const { compare } = require("bcryptjs");
const AppError = require("../../../../utils/errors/appError");
const { sign } = require("jsonwebtoken");

class AuthenticateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }) {
    //verifica se o email existe, e então retorna um erro caso o email não seja encontradoe
    const user = await this.usersRepository.findByEmail({ email });
    if (!user) {
      throw new AppError("Email or Password invalid!!", 401);
    }

    //verifica se a senha passada é válida, e então retorna um erro caso não for
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or Password invalid!!", 401);
    } else {
      // após as duas validações, tanto de email quando de senha, retorna um token com validação de 15 dias
      const token = sign({ email }, process.env.SECRET_USER, {
        subject: user.id,
        expiresIn: "15d",
      });

      return token;
    }
  }
}

module.exports = AuthenticateUserUseCase;
