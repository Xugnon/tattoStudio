const AuthenticateUserUseCase = require("./authenticateUserUseCase");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

class AuthenticateUserController {
  async handle(req, res) {
    try {
      //recebe o email e a senha pelo corpo da requisição
      const { email, password } = req.body;

      //inicializa o useCase, utilizando o repositório Prisma
      const prismaUsersRepository = new PrismaUsersRepository();
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        prismaUsersRepository
      );

      //execute o useCase
      const result = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      // recebe o erro enviado pelo useCase
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = AuthenticateUserController;
