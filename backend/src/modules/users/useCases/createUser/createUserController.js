const CreateUserUseCase = require("./createUserUseCase");

class CreateUserController {
  async handle(req, res) {
    const { name, email, address, pessoal_number } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      address,
      pessoal_number,
    });

    return res.status(201).json(user);
  }
}

module.exports = CreateUserController;
