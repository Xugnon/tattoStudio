const AuthenticateUserUseCase = require("./authenticateUserUseCase");

class AuthenticateUserController {
  async handle(req, res) {
    try {
      const { email, password } = req.body;

      const authenticateUserUseCase = new AuthenticateUserUseCase();

      const result = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

module.exports = AuthenticateUserController;
