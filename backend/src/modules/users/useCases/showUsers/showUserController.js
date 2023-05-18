const ShowUserUseCase = require("./showUserUseCase");

class ShowUserController {
  async handle(req, res) {
    try {
      const { id_user } = req;

      const showUserUseCase = new ShowUserUseCase();

      const user = await showUserUseCase.execute({ id_user });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

module.exports = ShowUserController;
