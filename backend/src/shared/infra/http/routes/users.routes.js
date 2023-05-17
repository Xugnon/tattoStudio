const Router = require("express");
const CreateUserController = require("../../../../modules/users/useCases/createUser/createUserController");
const AuthenticateUserController = require("../../../../modules/users/useCases/authenticateUser/authenticateController");

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/auth", authenticateUserController.handle);

module.exports = usersRoutes;
