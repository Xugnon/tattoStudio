const AppError = require("../../../../utils/errors/appError");

class ShowUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ id_user }) {
    //verifica o usuário pelo id
    const user = await this.usersRepository.findById({ id_user });

    if (!user) {
      //caso não ache, retorna um erro
      throw new AppError("User not found!!", 404);
    } else {
      //caso ache, retorna o usuário
      return user;
    }
  }
}

module.exports = ShowUserUseCase;
