const CreateUserUseCase = require("./createUserUseCase");

class CreateUserController {
  async handle(req, res) {
    try {
      const { name, email, password, address, pessoal_number } = req.body;

      const createUserUseCase = new CreateUserUseCase();

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        address,
        pessoal_number,
      });

      const userResponse = {
        id: user.id,
        name: user.name,
        address: user.address,
        pessoal_number: user.pessoal_number,
      };

      return res.status(201).json(userResponse);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

module.exports = CreateUserController;
