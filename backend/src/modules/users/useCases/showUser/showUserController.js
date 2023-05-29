const ShowUserUseCase = require("./showUserUseCase");

class ShowUserController {
  async handle(req, res) {
    try {
      const { id_user } = req;

      const showUserUseCase = new ShowUserUseCase();

      const user = await showUserUseCase.execute({ id_user });

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
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = ShowUserController;
