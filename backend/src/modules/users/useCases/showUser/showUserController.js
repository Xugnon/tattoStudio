const ShowUserUseCase = require("./showUserUseCase");
const PrismaUsersRepository = require("../../repositories/prismaUsersRepository");

class ShowUserController {
  async handle(req, res) {
    try {
      //recebe o id do usuário por meio do token passado, onde pelo middleware, é feito a validação
      const { id_user } = req;

      // inicializa o useCase, utilizando o repositório Prisma
      const prismaUsersRepository = new PrismaUsersRepository();
      const showUserUseCase = new ShowUserUseCase(prismaUsersRepository);

      const user = await showUserUseCase.execute({ id_user });

      // retorna apenas os seguintes campos, evitando de passar dados sensíveis
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        pessoal_number: user.pessoal_number,
        services: user.Services,
        schedules: user.Schedules,
      };

      return res.status(200).json(userResponse);
    } catch (error) {
      // recebe o erro enviado pelo useCase
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = ShowUserController;
