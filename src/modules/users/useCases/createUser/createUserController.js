const CreateUserUseCase = require("./createUserUseCase");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

class CreateUserController {
  async handle(req, res) {
    try {
      // recebe os parametros necessarios para o useCase, por meio do corpo da requisição
      const { name, email, password, address, pessoal_number } = req.body;

      // inicializa o useCase, utilizando o repositório Prisma
      const prismaUsersRepository = new PrismaUsersRepository();
      const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        address,
        pessoal_number,
      });

      // retorna apenas os seguintes campos, evitando de passar dados sensíveis
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        pessoal_number: user.pessoal_number,
      };

      return res.status(201).json(userResponse);
    } catch (error) {
      // recebe o erro enviado pelo useCase
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CreateUserController;
