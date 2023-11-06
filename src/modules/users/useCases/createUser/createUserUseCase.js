const AppError = require("../../../../utils/errors/appError");

class CreateUserUseCase {
  // Inicializando o repositório
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password, address, pessoal_number }) {
    const user = await this.usersRepository.findByEmailOrNumber({
      email,
      pessoal_number,
    });

    if (!user) {
      // verifica o objeto user, caso não existir, então cria um novo
      const newUser = await this.usersRepository.create({
        name,
        email,
        password,
        address,
        pessoal_number,
      });

      return newUser;
    } else {
      // caso existir, retorna um erro
      throw new AppError("Email or Number already in use!!", 409);
    }
  }
}

module.exports = CreateUserUseCase;
